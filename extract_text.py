
import sys
import json
import re

def extract_text_from_pdf(pdf_path):
    text = ""
    # Try pypdf first
    try:
        from pypdf import PdfReader
        reader = PdfReader(pdf_path)
        for page in reader.pages:
            text += page.extract_text() + "\n"
        return text
    except ImportError:
        pass
        
    # Try PyPDF2
    try:
        import PyPDF2
        with open(pdf_path, 'rb') as f:
            reader = PyPDF2.PdfReader(f)
            for page in reader.pages:
                text += page.extract_text() + "\n"
        return text
    except ImportError:
        pass

    # Try pdfminer
    try:
        from pdfminer.high_level import extract_text
        text = extract_text(pdf_path)
        return text
    except ImportError:
        pass

    return "ERROR: No suitable PDF library found (pypdf, PyPDF2, pdfminer)."

if __name__ == "__main__":
    pdf_path = "Profile (1).pdf"
    content = extract_text_from_pdf(pdf_path)
    print(content)
