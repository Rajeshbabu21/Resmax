import os
import logging
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
else:
    logger.warning("GEMINI_API_KEY not found in environment variables.")


try:
    model_name = "models/gemini-2.5-flash"
    model = genai.GenerativeModel(model_name)
    
except Exception as e:
    logger.error(f"Failed to initialize Gemini GenerativeModel: {e}")
    model = None

def generate_ats_keywords(role: str, category: str, experience: str) -> list:
    
    logger.info(f"Generating 20 ATS keywords for {experience} job role: '{role}' in {category}")
    if not model:
        raise RuntimeError("Gemini model is not initialized.")
        
    prompt = f"""
    You are an expert ATS system. Generate exactly 20 essential ATS keywords (a combination of technical and soft skills) for a {experience} level {role} role in the {category} field.
    Return ONLY the keywords as a simple comma-separated list. No bullet points, no numbering, no extra text.
    """
    try:
        response = model.generate_content(prompt)
        # Clean response added line breaks or extra spaces
        raw_text = response.text.replace('\n', ',')
        keywords = [k.strip() for k in raw_text.split(",") if k.strip()]
        
        # only 20 words
        keywords = keywords[:20]
        
        logger.info(f"Successfully generated {len(keywords)} ATS keywords.")
        return keywords
    except Exception as e:
        logger.error(f"Error generating ATS keywords for role '{role}': {e}")
        raise

def find_missing_keywords(keywords: list, resume_text: str) -> list:

    logger.info(f"Analyzing resume to find missing keywords among the {len(keywords)} required skills.")
    if not model:
        raise RuntimeError("Gemini model is not initialized.")
        
    prompt = f"""
    I have a list of required keywords for a job, and the text of a resume. 
    Analyze the resume and return a comma-separated list of the keywords that are COMPLETELY MISSING from the resume text.
    
    Required Keywords: {', '.join(keywords)}
    
    Resume Text:
    {resume_text[:12000]} # Limiting context window safety
    
    Return ONLY a comma-separated list of the missing keywords. If none are missing, return the exact word 'None'. No other text.
    """
    try:
        response = model.generate_content(prompt)
        text_resp = response.text.strip()
        
        if text_resp.lower() == 'none' or text_resp == '':
            logger.info("No missing keywords identified by AI.")
            return []
            
        missing = [k.strip() for k in text_resp.split(",") if k.strip()]
        logger.info(f"Detected {len(missing)} missing keywords.")
        return missing
    except Exception as e:
        logger.error(f"Error detecting missing keywords: {e}")
        raise

def generate_feedback(resume_text: str, missing_keywords: list, experience: str) -> str:
    logger.info(f"Generating AI feedback on how to improve the {experience} level resume.")
    if not model:
        raise RuntimeError("Gemini model is not initialized.")
        
    missing_str = ", ".join(missing_keywords) if missing_keywords else "None (Excellent match!)"
    
    prompt = f"""
    Analyze the following resume and score it based on ATS standards.

    Scoring Criteria (Total 100):

    1. Content Quality (0–40)
       - Relevance of skills
       - Experience clarity
       - Achievements and impact

    2. ATS Structure (0–20)
       - Proper headings
       - ATS friendly formatting
       - Use of bullet points and sections

    3. Job Optimization (0–25)
       - Match between resume and job description
       - Relevant keywords
       - Skills alignment

    4. Ready to Apply (0–5)
       - Overall readiness for job submission

    5. Writing Quality (0–10)
       - Grammar
       - Professional tone
       - Clarity

    Missing Keywords from Resume: {missing_str}
    
    Resume Text (excerpt):
    {resume_text[:6000]}

    Return the response in JSON format strictly following this schema:
    {{
        "content_quality": <number 0-40>,
        "ats_structure": <number 0-20>,
        "job_optimization": <number 0-25>,
        "ready_to_apply": <number 0-5>,
        "writing_quality": <number 0-10>,
        "feedback": "<string: overall actionable feedback and suggestions>"
    }}
    """
    try:
        response = model.generate_content(prompt)
        feedback = response.text.strip()
        logger.info("Successfully generated actionable resume feedback.")
        return feedback
    except Exception as e:
        logger.error(f"Error generating AI feedback: {e}")
        raise