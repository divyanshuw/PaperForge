from extraction_final import text_extraction    
from embedding import embed_sections
from db import upsert_embeddings



if __name__ == "__main__":
    file_path = "../tester_files/research_paper.pdf"
    # extract the sections form the file
    sections = text_extraction(file_path)
    
    # embed the sections into vectors to upsert 
    embeds = embed_sections(sections)
    
    # upsert the embeddings into the pinecone database
    upsert_embeddings(sections,embeds)