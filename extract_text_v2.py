
import sys

def extract_text_from_pdf(pdf_path):
    text = ""
    # Try pypdf
    try:
        from pypdf import PdfReader
        reader = PdfReader(pdf_path)
        for page in reader.pages:
            t = page.extract_text()
            if t:
                text += t + "\n"
        return text
    except Exception as e:
        return f"pypdf failed: {e}"

if __name__ == "__main__":
    pdf_path = "Profile (1).pdf"
    content = extract_text_from_pdf(pdf_path)
    # Print non-empty lines
    for line in content.splitlines():
        if line.strip():
            print(line.strip())
    print("---END---")
