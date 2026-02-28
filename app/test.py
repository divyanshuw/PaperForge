import pymupdf
import re
from statistics import mean
import pprint
from langchain_core.documents import Document
    
    
def convert_into_docs(sections):
    docs = []
    for section in sections:
        doc = Document(
            page_content=section["text"],
            metadata={
                "title": section["title"],
                "page": section["page"]
            }
        )
        docs.append(doc)
    return docs

def merge_title_and_text(sections):
    merged_sections = []
    cur_text = ""
    cur_title = ""
    page_list = []
    for section in sections:
        
        # A section can be a title or text
        #if section is a title then I need to replace the previous title with the new title
        #else if the section is text then I need to append it to the current text
        
        # if section['title'] != '':
            
        #     if cur_title is not None and cur_text is not None:
        #         merged_sections.append({
        #             "title": cur_title.strip(),
        #             "text": cur_text.strip(),
        #             "page": list(set(page_list if page_list else None))
        #         })
                
        #     cur_title = section['title']
        #     cur_text = ""
        #     page_list = [section['page']]      
        # else:
            
        #      cur_text += section['text'] + "\n"
        #      page_list.append(section['page'])   
        
        
        if section["title"]:
            if cur_title != "" and cur_text != "":
                merged_sections.append({
                    "title": cur_title.strip(),
                    "text": cur_text.strip(),
                    "page": section["page"]
                })
                cur_title = section["title"]
                cur_text = ""
        else:
            if section["text"]:
                cur_text += section["text"] + "\n"

    merged_sections.append({
        "title": cur_title.strip(),
        "text": cur_text.strip(),   
        "page": list(set(page_list)) if page_list else []
    })
    
    return merged_sections    
    
            
            
def test_extraction(file_path):
    
    doc = pymupdf.open(file_path)
    
    all_sizes = []
    
    # extracting all the text sizes to determin the mean so that sections can be segregated based on text size
    for page in doc:
        
        text_dict = page.get_text("dict")
        for block in text_dict["blocks"]:
            
            if block["type"] == 0:
                for line in block["lines"]:
                    for span in line["spans"]:
                        size = span["size"]
                        all_sizes.append(size)

    mean_font_size = mean(all_sizes)
    print(f"Mean font size: {mean_font_size}")
    
    # detecting the sections 
    sections = []

    
    for page_no,page in enumerate(doc):
        text_dict = page.get_text("dict")
        
        for block in text_dict["blocks"]:
            if block["type"] != 0:
                continue
            
            block_text = ""
            max_size = 0
            section_text = ""
            section_title = ""
            
            
            for line in block["lines"]:
                for span in line["spans"]:
                    block_text += span["text"]
                    max_size = max(max_size, span["size"])
                    
            block_text = block_text.strip()
            
            if len(block_text.split()) < 2:
                continue
            
            is_large = max_size > mean_font_size
            is_short = len(block_text.split()) < 20
            is_numbered = re.match(r"^\s*(\d+(\.\d+)*|[IVX]+)\s*\.?\s*", block_text)
            is_upper = block_text.isupper()
            
            if is_large and is_short and (is_numbered or is_upper):
                section_title += block_text
            else:
                section_text += block_text + "\n"
            
            sections.append({
                "title": section_title.strip(),
                "text": section_text.strip(),
                "page": page_no + 1
            }) 
    merged_sections = merge_title_and_text(sections)
    return merged_sections
            
        


if __name__ == "__main__":
    pdf_path = "../tester_files/research_paper.pdf"
    pprint.pprint(docs)