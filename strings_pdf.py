
import re

def clean_text(text):
    # Keep only printable chars
    return "".join(c for c in text if c.isprintable())

def extract_strings(pdf_path):
    with open(pdf_path, 'rb') as f:
        data = f.read()
        # Decode latin1 to avoid errors, then find strings
        text = data.decode('latin1', errors='ignore')
        
        # heuristic: look for sequences of printable chars > 4 length
        strings = re.findall(r'[\x20-\x7E]{4,}', text)
        for s in strings:
            print(s)

if __name__ == "__main__":
    extract_strings("Profile (1).pdf")
