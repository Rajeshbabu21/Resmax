from pydantic import BaseModel
from typing import Optional

class CoverLetterCreate(BaseModel):
    user_id: Optional[int] = None
    resume_id: int
    job_description: str
    resume_text: Optional[str] = None
    