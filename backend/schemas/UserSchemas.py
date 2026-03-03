from pydantic import BaseModel,EmailStr
from typing import List, Optional
from datetime import date, time
import uuid
from uuid import UUID

class Users(BaseModel):
    first_name:str
    last_name:str
    email:str
    password:str
    is_active:Optional[bool]=True


class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class UserLogin(BaseModel):
    email: str
    password: str

