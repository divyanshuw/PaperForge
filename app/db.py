from pinecone import Pinecone
from dotenv import load_dotenv
load_dotenv("../.env")
import os


pine_key = os.getenv("PINE_KEY")
pine_client = Pinecone(api_key=pine_key)

index = pine_client.Index("paperforge")

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


