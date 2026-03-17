import torch
from FlagEmbedding import BGEM3FlagModel


def embed_sections(sections):
    model = BGEM3FlagModel("BAAI/bge-large-en-v1.5", device="cuda", use_fp16=True)
    
    final_sections = [str(s) for s in truncate_sections(sections)]

    embeddings = model.encode(final_sections,batch_size = 8, max_length=512)["dense_vecs"]
    return embeddings
    
    
def truncate_sections(sections,max_length=512):
    truncate_sections = []
    for section in sections:
        title = section['title']
        content = section['text']
        while content != '':
            truncate_sections.append({
                "title":title,
                "text": content[:max_length]
            })
            content = content[max_length:]
    return truncate_sections
