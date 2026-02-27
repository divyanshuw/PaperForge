import json
import pymupdf4llm
from extraction_robust import extract_sections_from_pdf
from langchain_text_splitters import RecursiveCharacterTextSplitter


#500-700 tokens per chunk
#80-120 token overlap

def chunk_paragraphs(file_path):
    sections = extract_sections_from_pdf(file_path)
    print(type(sections))
    # `extract_sections_from_pdf` may return a JSON string or a Python list.
    # Normalize to a Python object and return it so callers receive the data.
    if isinstance(sections, str):
        try:
            sections = json.loads(sections)
        except Exception:   
            # leave as-is if it isn't valid JSON
            pass
    return sections


if __name__ == '__main__':
    file_path = '../tester_files/research_paper_2.pdf'
    chunks = chunk_paragraphs(file_path)
    print(chunks)