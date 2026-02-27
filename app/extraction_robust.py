import os
import json
import re
import pymupdf


def extract_sections_from_pdf(pdf_path, trim_to_heading=True):
    doc = pymupdf.open(pdf_path)
    toc = doc.get_toc() or []
    n_pages = doc.page_count

    sections = []
    if not toc:
        # Fallback: return whole document as a single section
        full_text = []
        for p in range(n_pages):
            page = doc.load_page(p)
            full_text.append(page.get_text("text") or "")
        sections.append({
            "title": os.path.basename(pdf_path),
            "level": 1,
            "start_page": 1,
            "end_page": n_pages,
            "text": "\n\n".join(full_text).strip(),
            "anchor_found": False,
            "toc_index": None,
        })
        return sections

    def split_into_paragraphs(text):
        if not text:
            return []
        # remove hyphen-newline joins
        text = re.sub(r'-\n', '', text)
        text = text.replace('\r\n', '\n').replace('\r', '\n')
        text = re.sub(r'\n\s*\n+', '\n\n', text)
        raw_pars = re.split(r'\n{2,}', text)
        pars = []
        for p in raw_pars:
            p = re.sub(r'\n+', ' ', p)
            p = re.sub(r'\s+', ' ', p).strip()
            if p:
                pars.append(p)
        return pars


    # Build page ranges for each TOC entry
    for i, entry in enumerate(toc):
        level, title, start_page = entry
        # find next entry with level <= current level
        end_page = n_pages
        for j in range(i + 1, len(toc)):
            next_level, _, next_page = toc[j]
            if next_level <= level:
                end_page = next_page - 1
                break

        # gather text from start_page..end_page (TOC pages are 1-based)
        pages_text = []
        for p in range(start_page - 1, end_page):
            page = doc.load_page(p)
            pages_text.append(page.get_text("text") or "")
        combined = "\n\n".join(pages_text).strip()
        anchor_found = False
        if trim_to_heading and title and combined:
            # simple case-insensitive substring search for the heading on the first page
            first_page_text = pages_text[0] if pages_text else ""
            if title.lower() in first_page_text.lower():
                # trim from the first occurrence of the title on the first page
                idx = first_page_text.lower().find(title.lower())
                # compute trimmed text starting at the heading occurrence
                trimmed = first_page_text[idx:].strip()
                if end_page > start_page:
                    rest = "\n\n".join(pages_text[1:])
                    combined = (trimmed + "\n\n" + rest).strip()
                else:
                    combined = trimmed
                anchor_found = True
        # split into paragraphs and map each paragraph to an approximate page
        paragraphs = split_into_paragraphs(combined)
        para_objs = []
        for pi, ptext in enumerate(paragraphs, start=1):
            mapped_page = None
            # try to find which page contains the paragraph (first match)
            for idx, pg in enumerate(pages_text):
                if ptext in pg:
                    mapped_page = start_page + idx
                    break
            para_objs.append({"paragraph_number": pi, "text": ptext, "page": mapped_page})

        sections.append({
            "title": title,
            "level": level,
            "start_page": start_page,
            "end_page": end_page,
            "text": combined,
            "paragraphs": para_objs,
            "anchor_found": anchor_found,
            "toc_index": i,
        })
    doc.close()
    return json.dumps(sections, indent=2)


if __name__ == '__main__':
    my_file_path = os.path.join(os.path.dirname(__file__), '..', 'tester_files', 'research_paper_2.pdf')
    my_file_path = os.path.normpath(my_file_path)
    if not os.path.exists(my_file_path):
        print(f"Test PDF not found at {my_file_path}; run with a real PDF to test.")
    else:
        secs = extract_sections_from_pdf(my_file_path)
        print(json.dumps([{"title": s["title"], "start": s["start_page"], "end": s["end_page"], "para_objs": s['paragraphs']} for s in secs], indent=2))