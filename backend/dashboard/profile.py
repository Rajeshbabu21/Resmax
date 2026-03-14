from fastapi import FastAPI,Depends,HTTPException
from schemas.profile import Profile
from database.db import supabase
import logging


logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

async def get_profile(user_id: int):

    if not user_id:
        return {}

    profile = supabase.table("profiles").select("id,first_name,last_name").eq("id", user_id).execute()

    resumes = supabase.table("resumes").select("id,current_ats_score").eq("user_id", user_id).execute()

    cover_letters = supabase.table("cover_letters").select("id").eq("user_id", user_id).execute()

    email_drafts = supabase.table("email_drafts").select("id").eq("user_id", user_id).execute()

    resume_ids = [r["id"] for r in resumes.data]
    if resume_ids:
        scores = supabase.table("resume_scores").select(
            "content_quality, ats_structure, job_optimization, ready_to_apply, writing_quality"
        ).in_("resume_id", resume_ids).execute()
        score_data = scores.data[0] if scores.data else {}
    else:
        score_data = {}

    ats_scores = [r["current_ats_score"] for r in resumes.data]
    avg_ats = sum(ats_scores) / len(ats_scores) if ats_scores else 0

    return {
        "id": profile.data[0]["id"],
        "first_name": profile.data[0]["first_name"],
        "last_name": profile.data[0]["last_name"],
        "resumes": len(resumes.data),
        "cover_letters": len(cover_letters.data),
        "email_drafts": len(email_drafts.data),
        "ats_score": round(avg_ats,2),
        "content_quality": score_data.get("content_quality") or 0,
        "ats_structure": score_data.get("ats_structure") or 0,
        "job_optimization": score_data.get("job_optimization") or 0,
        "ready_to_apply": score_data.get("ready_to_apply") or 0,
        "writing_quality": score_data.get("writing_quality") or 0
    }  

