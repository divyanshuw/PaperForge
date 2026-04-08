import torch
import os
from FlagEmbedding import BGEM3FlagModel
import warnings

# Disable progress bars and warnings from HuggingFace libraries
os.environ['TOKENIZERS_PARALLELISM'] = 'false'
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
warnings.filterwarnings('ignore')

# Disable tqdm progress bars
os.environ['TQDM_DISABLE'] = '1'

try:
    from tqdm import tqdm
    tqdm.disable(disable=True)
except ImportError:
    pass

try:
    from transformers.utils import logging
    logging.set_verbosity_error()
except ImportError:
    pass


def embed_sections(sections):
    model = BGEM3FlagModel("BAAI/bge-large-en-v1.5", device="cuda", use_fp16=True)
    
    final_sections = [str(s) for s in truncate_sections(sections)]

    embeddings = model.encode(final_sections,batch_size = 8, max_length=512)["dense_vecs"]
    return embeddings
    
def embed_query(query):
    model = BGEM3FlagModel("BAAI/bge-large-en-v1.5", device="cuda", use_fp16=True)
    embedding = model.encode([query],batch_size = 1, max_length=512)["dense_vecs"][0]
    return embedding
    
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
