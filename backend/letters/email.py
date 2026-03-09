from fastapi import FastAPI
from schemas.email import EmailCreate
from database.db import supabase
import google.generativeai as genai
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

app = FastAPI()

async def generate_email_draft(data: EmailCreate):
    logger.info(f"--- Starting Email Draft Generation Pipeline for User ID: {data.user_id}, Resume ID: {data.resume_id} ---")

    try:
        
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
        
        # Log a snippet of the extracted text to verify database contents
        logger.info(f"Extracted Resume Content Snapshot:\n{resume_text[:500]}...")

        # Gemini model
        logger.info("Initializing Gemini model")
        model = genai.GenerativeModel("models/gemini-2.5-flash")

        prompt = f"""
        Generate a professional job application email.

        Return the result in this format:

        Subject: <email subject>

        Body:
        <email body>

        Use the following information.

        Resume:
        {resume_text}

        Job Description:
        {data.job_description}
        """
        
        logger.info("Generating email draft via Gemini API")
        response = model.generate_content(prompt)
        raw_text = response.text.strip()
        
        # Parse the response for subject and body
        email_subject = "Job Application"
        email_body = raw_text
        
        if "Subject:" in raw_text and "Body:" in raw_text:
            parts = raw_text.split("Body:", 1)
            email_subject = parts[0].replace("Subject:", "").strip()
            email_body = parts[1].strip()

        # Store in Supabase
        logger.info("Saving generated email draft to database")
        result = (
            supabase.table("email_drafts")
            .insert({
                "user_id": data.user_id,
                "resume_id": data.resume_id,
                "job_description": data.job_description,
                "email_subject": email_subject,
                "email_body": email_body
            })
            .execute()
        )
        
        logger.info("Successfully generated and saved email draft.")
        return result.data
    except Exception as e:
        logger.error(f"Error generating email draft: {e}", exc_info=True)
        return {"error": str(e)}