import pdfplumber
import re
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def parse_resume(file) -> str:
    """Extract text from PDF using pdfplumber."""
    logger.info("Starting resume extraction with pdfplumber.")
    text = ""
    try:
        with pdfplumber.open(file) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
        logger.info(f"Successfully extracted {len(text)} characters from resume.")
        return text
    except Exception as e:
        logger.error(f"Error extracting text from PDF: {e}")
        raise

def clean_text(text: str) -> str:
    """Clean resume text by removing extra spaces, special characters, and normalizing text."""
    logger.info("Cleaning extracted text.")
    try:
        text = text.lower()
        # Remove unusual characters but keep standard alphanumerics and common punctuation 
        # (like +, #, . for C++, C#, .NET etc)
        text = re.sub(r'[^a-z0-9\s.+/#-]', ' ', text)
        text = re.sub(r'\n+', ' ', text)
        text = re.sub(r'\s+', ' ', text)
        cleaned = text.strip()
        logger.info(f"Text cleaning completed. Final length: {len(cleaned)} characters.")
        return cleaned
    except Exception as e:
        logger.error(f"Error cleaning text: {e}")
        raise