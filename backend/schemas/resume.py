from pydantic import BaseModel
from typing import Dict, Any

class ResumeDraftCreate(BaseModel):
    title: str
    content: Dict[str, Any]
