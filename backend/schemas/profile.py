from pydantic import BaseModel
from typing import Optional

class Profile(BaseModel):
    id:int
    first_name:str
    last_name:str
    ats_score:float
    resumes: int
    cover_letters: int
    email_drafts: int
    content_quality:int
    ats_structure:int
    job_optimization:int
    ready_to_apply:int
    writing_quality:int

