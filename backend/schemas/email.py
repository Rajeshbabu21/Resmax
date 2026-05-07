from pydantic import BaseModel
from typing import Optional

class EmailCreate(BaseModel):
    user_id: Optional[int] = None
    resume_id: Optional[int] = None
    job_description: str
    resume_text: Optional[str] = None
    