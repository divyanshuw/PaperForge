from pypdf import PdfReader
import re
import json


def split_into_paragraphs(text):
    if not text:
        return []
    # Join words broken by hyphen+newline
    text = re.sub(r'-\n', '', text)
    # Normalize newlines
    text = text.replace('\r\n', '\n').replace('\r', '\n')
    # Collapse runs of blank lines to a single paragraph separator
    text = re.sub(r'\n\s*\n+', '\n\n', text)
    # Split into paragraphs on two or more newlines
    raw_pars = re.split(r'\n{2,}', text)
    paragraphs = []
    for p in raw_pars:
        # collapse internal newlines and excessive whitespace
        p = re.sub(r'\n+', ' ', p)
        p = re.sub(r'\s+', ' ', p).strip()
        if p:
            paragraphs.append(p)
    return paragraphs


def extract_text_from_pdf(pdf_path):
    reader = PdfReader(pdf_path)
    pages = []
    for page in reader.pages:
        pages.append(page.extract_text() or '')
    # Preserve page breaks as paragraph separators
    full_text = '\n\n'.join(pages)
    return split_into_paragraphs(full_text)


def extract_text_from_pdf_by_page(pdf_path, page_number):
    reader = PdfReader(pdf_path)
    if page_number < len(reader.pages):
        page = reader.pages[page_number]
        return split_into_paragraphs(page.extract_text() or '')
    else:
        raise ValueError("Page number exceeds the total number of pages in the PDF.")


if __name__ == '__main__':
    my_file_path = './tester_files/research_paper.pdf'
    paragraphs = extract_text_from_pdf(my_file_path)
    for i, p in enumerate(paragraphs, 1):
        json_para = json.dumps({
            "paragraph_number": i,
            "text": p
        })
        print(json_para)
