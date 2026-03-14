import logging
import json
import re
from fastapi import UploadFile

from core.resume_parser import parse_resume, clean_text
from core.embedding_service import (
    chunk_text, 
    generate_resume_embeddings, 
    generate_keyword_embeddings
)
from core.cosine_similarity import (
    calculate_similarity, 
    top_k_scores, 
    calculate_ats_score
)
from core.ai_service import (
    generate_ats_keywords, 
    find_missing_keywords, 
    generate_feedback
)

# Attempt to import Supabase client based on potential project structures
try:
    from database.supabase import supabase
except ImportError:
    try:
        from database.db import supabase
    except ImportError:
        supabase = None

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

async def analyze_resume(category: str,role: str, experience: str, file: UploadFile, user_id: int = None) -> dict:
    """
    Orchestrates the entire ATS Resume Analysis pipeline.
    Uses async-compatible definition for FastAPI compatibility.
    """
    logger.info(f"--- Starting ATS Resume Analysis Pipeline for role: '{role}' ---")
    
    try:
        # Step 1: Parse resume
        logger.info("Step 1: Parsing resume")
        # Extract text directly from the internally spooled file object of UploadFile
        raw_text = parse_resume(file.file)
        
        # Step 2: Clean text
        logger.info("Step 2: Cleaning text")
        cleaned_text = clean_text(raw_text)
        
        # Step 3: Chunk resume
        logger.info("Step 3: Chunking resume text")
        chunks = chunk_text(cleaned_text, chunk_size=300)
        
        # Step 4: Generate ATS keywords
        logger.info(f"Step 4: Generating ATS keywords via LLM for {experience} {role} in {category}")
        keywords = generate_ats_keywords(role, category, experience)
        
        # Step 5: Generate resume embeddings
        logger.info("Step 5: Generating vector embeddings for resume chunks")
        resume_embeddings = generate_resume_embeddings(chunks)
        
        # Step 6: Generate keyword embeddings
        logger.info("Step 6: Generating vector embeddings for ATS keywords")
        keyword_embeddings = generate_keyword_embeddings(keywords)
        
        # Step 7: Calculate similarity
        logger.info("Step 7: Calculating cosine similarity matrix")
        similarity_scores = calculate_similarity(resume_embeddings, keyword_embeddings)
        
        # Step 8: Extract top-k scores
        logger.info("Step 8: Extracting top-k similarity scores")
        # In an ATS context, considering the top 10 matched keywords out of the 20 generated
        top_scores = top_k_scores(similarity_scores, k=10)
        
        # Step 9: Calculate ATS score
        logger.info("Step 9: Calculating final ATS percentage score")
        ats_score = calculate_ats_score(top_scores)
        
        # Step 10: Detect missing keywords
        logger.info("Step 10: Detecting missing keywords in resume")
        missing_keywords = find_missing_keywords(keywords, cleaned_text)
        
        # Step 11: Generate feedback
        logger.info("Step 11: Generating improvement feedback")
        raw_feedback = generate_feedback(cleaned_text, missing_keywords, experience)
        
        # Parse feedback JSON
        content_quality, ats_structure = 0, 0
        job_optimization, ready_to_apply, writing_quality = 0, 0, 0
        feedback_text = raw_feedback
        parsed_json = None
        
        try:
            clean_str = re.sub(r'^```(?:json)?\s*', '', raw_feedback.strip())
            clean_str = re.sub(r'\s*```$', '', clean_str.strip())
            parsed_json = json.loads(clean_str)
            
            content_quality = int(parsed_json.get("content_quality", 0))
            ats_structure = int(parsed_json.get("ats_structure", 0))
            job_optimization = int(parsed_json.get("job_optimization", 0))
            ready_to_apply = int(parsed_json.get("ready_to_apply", 0))
            writing_quality = int(parsed_json.get("writing_quality", 0))
            
            if "feedback" in parsed_json:
                feedback_text = parsed_json["feedback"]
        except Exception as e:
            logger.error(f"Failed to parse AI feedback JSON: {e}")
        
        # Step 12: Save ATS score and feedback to Supabase (if available)
        logger.info("Step 12: Saving results to database")
        
        resume_id = None
        
        if supabase and user_id:
            try:
                # First, create the parent Resume record
                # Requires title and original_content to satisfy NOT NULL constraints and utility
                resume_insert = supabase.table("resumes").insert({
                    "user_id": user_id,
                    "title": f"{experience.capitalize()} {role} Resume in {category}",
                    "original_content": raw_text[:30000],  # Storing up to 30k chars to be safe
                    "current_ats_score": ats_score
                }).execute()
                
                if resume_insert.data and len(resume_insert.data) > 0:
                    resume_id = resume_insert.data[0].get("id")
                    
                    # Next, create the Resume Score record tied to the Resume ID
                    supabase.table("resume_scores").insert({
                        "resume_id": resume_id,
                        "ats_score": ats_score,
                        "feedback": feedback_text,
                        "content_quality": content_quality,
                        "ats_structure": ats_structure,
                        "job_optimization": job_optimization,
                        "ready_to_apply": ready_to_apply,
                        "writing_quality": writing_quality,
                    }).execute()
                    logger.info(f"Successfully saved ATS score to Supabase for User ID: {user_id}")
                else:
                    logger.warning(f"Failed to create base resume record for User ID: {user_id}")
                    
            except Exception as db_err:
                logger.error(f"Failed to save results to Supabase: {db_err}")
        else:
            logger.warning("Supabase client not found or User ID not provided. Skipping database insert.")
            
        # Step 13: Return response
        logger.info("Step 13: Pipeline complete. Returning structured response.")
        return {
            "resume_id": resume_id,
            "ats_score": ats_score,
            "keywords": keywords,
            "missing_keywords": missing_keywords,
            "feedback": parsed_json if parsed_json else feedback_text
        }

    except Exception as e:
        logger.error(f"ATS Pipeline failed during execution: {e}", exc_info=True)
        # Raise to allow FastAPI to return an HTTP Error response cleanly
        raise e
