from pinecone import Pinecone, ServerlessSpec
from dotenv import load_dotenv
import os
import time
from typing import Any, cast
from app.embedding import embed_query
import pprint

# .env conf
env_file = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".env"))
load_dotenv(env_file)

# Timeout innies
timeout = 500
start_time = time.monotonic()

pine_key = os.getenv("PINECONE_API_KEY")
print(f"Pinecone API Key: {'Found' if pine_key else 'Not Found'}")
if not pine_key:
    print("ERROR: PINECONE_API_KEY not set in .env file")
pine_client = Pinecone(api_key=pine_key)

# Index creation and check logic with timeout handling
if "archivist" not in pine_client.list_indexes().names():
    pine_client.create_index(
        name = 'archivist',
        dimension = 1024,
        metric  = 'cosine',
        spec = ServerlessSpec(cloud="aws", region="us-east-1")
    )
    # checking if the index is ready
    while not pine_client.describe_index('archivist').ready:
       time.sleep(1)
       #Check for timeout
       if time.monotonic() - start_time > timeout:
            raise TimeoutError("Index creation timed out.")
    print("Index 'archivist' is ready.")
else:
    print("Index 'archivist' already exists.")
    
# Initialize the index object
index = pine_client.Index('archivist')
print("Pinecone index initialized successfully.")

# Upsertion logic
def  upsert_embeddings(sections,embeddings):
    data_to_upsert =[]
    id = 1
    for section,embedding in zip(sections,embeddings):
        metadata = {
            "title": section["title"],
            "text": section["text"],
            "page": section["page"]
        }
        data_to_upsert.append((str(id), embedding, metadata))
        id += 1
    index.upsert(vectors=data_to_upsert)


def _to_dense_vector(embedding: Any) -> list[float]:
    if isinstance(embedding, dict):
        dense = embedding.get("dense_vecs")
        if dense is None:
            raise TypeError("embed_query returned a dict without 'dense_vecs'.")
        embedding = dense

    if hasattr(embedding, "tolist"):
        embedding = embedding.tolist()

    if isinstance(embedding, list) and embedding and isinstance(embedding[0], list):
        embedding = embedding[0]

    if not isinstance(embedding, list):
        raise TypeError("embed_query must return a dense vector list-compatible object.")

    return [float(x) for x in embedding]

def query_db(query : str, top_k: int = 5):

    embedding = _to_dense_vector(embed_query(query))
    
    response = cast(Any, index.query(
        vector=embedding,
        top_k=top_k,
        include_metadata=True,
    ))
    
    print(f"Number of matches: {len(response.matches)}")
    if response.matches:
        print(f"First match example: {response.matches[0]}")
        print(f"Metadata keys: {response.matches[0].metadata.keys() if hasattr(response.matches[0], 'metadata') else 'N/A'}")
    
    context = [match["metadata"]["text"] for match in response.matches if "text" in match.get("metadata", {})]
    pprint.pprint(context)
    return context


if __name__ == "__main__":
    # Check index stats first
    stats = index.describe_index_stats()
    print(f"\nIndex Stats: {stats}")
    print(f"Total vectors in index: {stats['total_vector_count'] if stats else 'N/A'}")
    
    query = "What is the capital of France?"
    result = query_db(query)