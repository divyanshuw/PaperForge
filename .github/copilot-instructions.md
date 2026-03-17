# Copilot instructions for research-assistant

## Build, test, and lint commands
- Install the required scientific stack and GPU-enabled Torch packages with `python -m pip install --upgrade pip && python -m pip install -r requirements.txt` (the requirements pin `torch 2.5.1+cu121`, `torchaudio`, `torchvision`, and the FlagEmbedding/LM tooling that the scripts consume).
- There is no automated lint suite; a quick sanity check is `python -m compileall app` or `python -m py_compile app/*.py` before committing.
- Run the extraction and embedding flow by invoking the scripts directly:
  - `python -m app.test` (alias `python app/test.py`) runs the heuristic `test_extraction` helper against `tester_files/research_paper.pdf` and prints the merged sections with `langchain_core.Document` metadata.
  - To run a single targeted extraction, use `python -c "from app.test import test_extraction; import json; print(json.dumps(test_extraction('tester_files/research_paper.pdf'), indent=2))"` or call `test_extraction(<your_pdf_path>)` from a short wrapper.
  - `python app/chunking.py` and `python app/embedding.py` are also entry points that exercise the downstream chunking/embedding helpers against `tester_files/research_paper_2.pdf` or `tester_files/research_paper.pdf` respectively.

## High-level architecture
- PDF ingestion alternates between two helpers: `extraction.py` for straightforward paragraph splitting via `pypdf.PdfReader`, and `extraction_robust.py` for TOC-aware parsing with `pymupdf`, JSON-serializing each section along with paragraph/metadata for downstream consumers.
- `chunking.py` calls `extract_sections_from_pdf` and normalizes whatever it returns (a JSON string when `extraction_robust.py` is invoked, or a list when the caller provides one); the comments emphasize 500‑700 token chunks with 80‑120 token overlaps even though the script currently just surfaces the raw sections for inspection.
- `test.py` is the heuristic layer that inspects every block on each page via `pymupdf`, tracks font sizes, and treats large, short, uppercase/numbered spans as section titles, then stitches them into merged sections before converting them into `langchain_core.Document` instances with `title`/`page` metadata.
- `embedding.py` glues the pipeline together: it calls `test_extraction`, flattens each section into `"title\ntext"`, and feeds the list to `BGEM3FlagModel` from the `FlagEmbedding` package (BGE-large, GPU only) to produce dense vectors that are printed for verification.
- Sample PDFs live under `tester_files/` (at least `research_paper.pdf` and `research_paper_2.pdf`) and are the default inputs for all the standalone scripts; replace them with real research PDFs when validating the pipeline.

## Key conventions specific to this repo
- Paragraph splitting across scripts consistently removes hyphen+newline joins, normalizes newline characters, collapses multi-line whitespace, and splits on runs of two or more newlines (`split_into_paragraphs` in both extraction helpers).
- `extract_sections_from_pdf` returns a JSON string even when the underlying logic already holds a Python list; `chunking.py` normalizes that by attempting `json.loads` and falling back to the raw object so downstream code always sees a list.
- Chunk size expectations come from the inline comments in `chunking.py`: plan for ~500‑700 token chunks with ~80‑120 token overlap when you wire in a real chunking implementation.
- `test_extraction` derives section titles by comparing block font size against the per-document mean (via `statistics.mean`), checking for uppercase text or numbered headings, and carrying the last seen title forward while appending text blocks; each merged section keeps page-level metadata that `langchain_core.Document` relies on.
- Embedding currently hinges on the CUDA versions of Torch packaged in `requirements.txt` (Cu121) and on the `BGEM3FlagModel` API, which returns a `dense_vecs` array; any rewrite that targets CPU must also swap to an embedding model that does not require those GPU dependencies.
- Because these scripts are run as standalone modules (e.g., `python app/embedding.py`), keep imports relative to the `app` package and avoid relying on package installation; the repository does not expose a `setup.py`/`pyproject`, so the scripts expect to run from the repo root.
