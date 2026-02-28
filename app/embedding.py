import torch
from FlagEmbedding import BGEM3FlagModel
from test import convert_into_docs, test_extraction

print("Torch version:", torch.__version__)
print("CUDA available:", torch.cuda.is_available())
print("Torch CUDA version:", torch.version.cuda)
print("GPU:", torch.cuda.get_device_name(0))


def embed_sections(sections):
    model = BGEM3FlagModel("BAAI/bge-large-en-v1.5", device="cuda", use_fp16=True)
    embeddings = model.encode(sections,batch_size = 8, max_length=700)["dense_vecs"]
    print("Embeddings shape:", embeddings.shape)

if __name__ == "__main__":
    
    file_path = "../tester_files/research_paper.pdf"
    sections = test_extraction(file_path)
    docs = convert_into_docs(sections)
    
    embed_sections(docs)
