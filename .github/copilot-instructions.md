# Copilot instructions for research-assistant

## Build, test, and lint commands
- Install the required scientific stack and GPU-enabled Torch packages with `python -m pip install --upgrade pip && python -m pip install -r app/requirements.txt` (the requirements pin `torch 2.5.1+cu126`, `torchaudio`, `torchvision`, and various LLM/embedding tooling). Uses **Python 3.11** with venv/conda.
- There is no automated lint suite; a quick sanity check is `python -m compileall app` or `python -m py_compile app/*.py` before committing.
- **Environment setup**: Ensure Pinecone API key and Gemini API key are set in `.env`.
- Run the PDF extraction, chunking, and embedding pipeline by invoking the main entry point or standalone scripts:
  - `python app/main.py` — Full end-to-end pipeline: extracts PDF → chunks sections → embeds with BGEM3 → upserts to Pinecone.
  - `python app/extraction_final.py` — Extracts PDF sections with heuristic title detection (font size, uppercase, numbering) and returns `langchain_core.Document` instances with metadata.
  - `python app/chunking.py` — Calls extraction and normalizes/inspects section chunks (target: 500–700 tokens with 80–120 overlap).
  - `python app/embedding.py` — Embeds sections using BGEM3FlagModel (GPU-required) and prints dense vectors for verification.

## High-level architecture
The research-assistant is a full-stack Python + Next.js application for PDF ingestion, semantic embedding, and LLM-powered querying:

**Backend pipeline (Python/PyTorch)**:
- `extraction_final.py` — Heuristic PDF → sections converter using PyMuPDF: inspects font sizes per page, detects titles (large, uppercase, numbered blocks), and merges sequential text blocks into sections with page/title metadata as `langchain_core.Document` objects.
- `chunking.py` — Calls extraction and normalizes section output; intended to split large sections into 500–700 token chunks with 80–120 token overlap (currently surfaces raw sections for review).
- `embedding.py` — Embeds flattened section text (format: `"title\ntext"`) via BGEM3FlagModel from FlagEmbedding (BGE-large, GPU-required) to produce dense vectors.
- `db.py` — Upserts embeddings to Pinecone vector DB for semantic search (API key in `.env`).
- `model.py` — Wrapper around Gemini API for LLM calls (Gemini API key in `.env`).
- `main.py` — Orchestrates the full pipeline: PDF → extraction → chunking → embedding → Pinecone upsert.

**Frontend** (`frontend/`): Next.js 16 + React 19 + TailwindCSS with:
- Authentication (NextAuth)  
- Document upload/viewer (Canvas, DocumentViewer components)
- Sidebar for documents and query interface (CommandCenter, FloatingInputBar)
- API routes for backend integration

**Database**: Pinecone (cloud-hosted) for vector search; Prisma schema (PostgreSQL candidate).

Sample PDFs under `tester_files/` (e.g., `research_paper.pdf`, `research_paper_2.pdf`) serve as test inputs.

## Key conventions specific to this repo

**Text processing**:
- Paragraph splitting consistently removes hyphen+newline joins, normalizes whitespace, and splits on runs of two or more newlines (`split_into_paragraphs` in extraction_final.py).
- All extraction helpers return structured `langchain_core.Document` objects with metadata keys: `title` (detected section heading), `page` (0-indexed), and content in the `.page_content` field.

**Extraction heuristics**:
- Section titles are detected by comparing block font size against the per-document mean (via `statistics.mean`).
- Large blocks (~2em), uppercase text, or numbered headings are treated as titles.
- Sequential text blocks inherit the last seen title and are merged into complete sections.

**Chunking & embedding**:
- Chunk size targets from inline comments: ~500–700 tokens with ~80–120 token overlap (not yet fully implemented in chunking.py — review for final implementation).
- Embed format: `"title\ntext"` passed to BGEM3FlagModel (GPU-required, CUDA 12.6 in current `requirements.txt`).
- BGEM3FlagModel returns `dense_vecs` (dense embeddings); CPU rewrites require swapping the embed model.

**Code patterns**:
- Scripts run as standalone modules (e.g., `python app/embedding.py`) with imports relative to `app/`.
- Project has `pyproject.toml` but no explicit package installation required; run from repo root.
- Environment variables (`.env`): `PINECONE_API_KEY`, `GEMINI_API_KEY`, `PINECONE_INDEX_NAME`, etc.

**Frontend/Backend integration** (under development):
- API routes in `frontend/app/api/` handle authentication and backend calls.
- Prisma schema in `frontend/prisma/schema.prisma` (PostgreSQL assumed).
- LLM queries flow through `model.py` → Gemini API with Pinecone context retrieval via `db.py`.

## Common pitfalls and development notes

**GPU/CUDA requirements**:
- BGEM3FlagModel requires CUDA (GPU) — no CPU fallback currently implemented. If running on CPU, you must swap the embedding model or skip embedding generation.
- CUDA 12.6 is pinned in `requirements.txt`; mismatched versions may cause `torch` import or `cuda_runtime` errors.

**API key configuration**:
- `.env` must include `PINECONE_API_KEY`, `GEMINI_API_KEY`, and any other service keys. `.env` is **not** tracked in git.
- If scripts fail silently at startup, check that all required keys are present.

**PDF extraction edge cases**:
- Heuristic title detection may fail on PDFs with inconsistent font sizes or non-standard layouts. Test extraction on specific PDFs first with `python app/extraction_final.py` before upsert.
- Very large PDFs may consume excessive memory during extraction; monitor memory during development.

**Embedding vector size**:
- BGEM3FlagModel produces 1024-dimensional dense vectors by default. Pinecone index must be created with matching dimensions.

**Frontend/Next.js setup** (must run separately):
- Install dependencies: `cd frontend && npm install`
- Environment: `.env.local` in `frontend/` for NextAuth and API endpoint configuration
- Dev server: `npm run dev` from `frontend/`
- Backend must be accessible at the API endpoint specified in frontend env vars

**Data flow debugging**:
- Run scripts individually to isolate issues: extraction → chunking → embedding → Pinecone upsert
- Print intermediate outputs (sections, chunk counts, vector shapes) for validation
- Pinecone queries return the most similar vectors; verify embeddings are actually being upserted to the index
