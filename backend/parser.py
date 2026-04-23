import fitz  # this is pymupdf, imported as fitz

def extract_text_from_pdf(file_bytes: bytes) -> str:
    # fitz.open() can open a PDF from raw bytes
    # "pdf" tells fitz what format to expect
    doc = fitz.open(stream=file_bytes, filetype="pdf")
    
    text = ""  # we'll collect all text here
    
    # loop through every page in the PDF
    for page in doc:
        # get_text() extracts all readable text from one page
        text += page.get_text()
    
    return text  # return the full resume as a string