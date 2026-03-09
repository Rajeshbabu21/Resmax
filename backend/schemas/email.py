from pydantic import BaseModel
from typing import Optional

class EmailCreate(BaseModel):
    user_id: Optional[int] = None
    resume_id: int
    job_description: str
    resume_text: Optional[str] = None
    email_subject: Optional[str] = None
    email_body: Optional[str] = None