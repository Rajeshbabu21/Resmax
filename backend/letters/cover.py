from fastapi import FastAPI
from schemas.cover import CoverLetterCreate
from database.db import supabase
import google.generativeai as genai
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

app = FastAPI()

async def generate_cover_letter(data: CoverLetterCreate):
    logger.info(f"--- Starting Cover Letter Generation Pipeline for User ID: {data.user_id}, Resume ID: {data.resume_id} ---")

    try:
        # Fetch resume content
        logger.info(f"Fetching resume with ID {data.resume_id} for user {data.user_id}")
        resume_response = (
            supabase.table("resumes")
            .select("original_content")
            .eq("id", data.resume_id)
            .eq("user_id", data.user_id)
            .execute()
        )

        if not resume_response.data:
            logger.warning(f"Resume {data.resume_id} for user {data.user_id} not found in database.")
            return {"error": "Resume not found"}

        resume_text = resume_response.data[0]["original_content"]

        # Gemini model
        logger.info("Initializing Gemini model")
        model = genai.GenerativeModel("models/gemini-2.5-flash")

        prompt = f"""
        Write a professional cover letter for the job.

Resume:
{resume_text}

Job Description:
{data.job_description}

CRITICAL INSTRUCTIONS:
- Extract the applicant's name, email, phone number, and LinkedIn/Portfolio URLs directly from the resume.
- DO NOT use any placeholders like [Your Name], [Company Name], [Date], [Hiring Manager], etc.
- If specific information (like the hiring manager's name or company address) is missing, seamlessly format the letter to omit those fields entirely rather than inserting a placeholder.
- Keep the cover letter concise, professional, and tailored to the job description (150–200 words).
        """
        
        logger.info("Generating content via Gemini API")
        response = model.generate_content(prompt)
        cover_letter = response.text

        # Store in Supabase
        logger.info("Saving generated cover letter to database")
        result = (
            supabase.table("cover_letters")
            .insert({
                "user_id": data.user_id,
                "resume_id": data.resume_id,
                "job_description": data.job_description,
                "cover_letter": cover_letter
            })
            .execute()
        )
        
        logger.info("Successfully generated and saved cover letter.")
        return result.data
    except Exception as e:
        logger.error(f"Error generating cover letter: {e}", exc_info=True)
        return {"error": str(e)}