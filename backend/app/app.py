from fastapi import FastAPI, Depends, HTTPException, status, Form, File, UploadFile
from database.db import supabase
from schemas.UserSchemas import Users, Token, TokenData, UserLogin
from auth.auth import verify_password, create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES, get_password_hash, get_current_active_user, current_user
from fastapi.security import OAuth2PasswordRequestForm
from typing import Optional
from datetime import timedelta
from core.service import analyze_resume
from  letters.cover import generate_cover_letter
from letters.email import generate_email_draft
from schemas.cover import CoverLetterCreate
from schemas.email import EmailCreate


from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/register_users")
def create_user(users: Users):
    try:
        users.password = get_password_hash(users.password)
        data = users.dict()
        response = supabase.table("profiles").insert(data).execute()
        if not response.data:
            raise HTTPException(status_code=400, detail="User not created")
        return {
            "message": "User created successfully",
            "data": response.data
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/user_login")
def login_users(form_data: OAuth2PasswordRequestForm = Depends()):
    try:
        response = (
            supabase
            .table("profiles")
            .select("*")
            .eq("email", form_data.username)
            .execute()
        )

        if not response.data:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )

        user = response.data[0]

        if not verify_password(form_data.password, user["password"]):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password"
            )

        access_token = create_access_token(
            data={"sub": user["email"]},
            expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
        )

        return {
            "access_token": access_token,
            "token_type": "bearer"
        }

    except Exception as e:
        print("LOGIN ERROR:", e)
        raise HTTPException(status_code=500, detail="Login failed")

@app.post("/analyze_resume")
async def analyze(
    role: str = Form(...),
    category: str = Form(...),
    experience: str = Form(...),
    file: UploadFile = File(...),
    user: dict = Depends(get_current_active_user)
):
    user_id = user.get("id") if isinstance(user, dict) else getattr(user, "id", None)
    
    if not user_id:
        raise HTTPException(status_code=401, detail="Valid user context missing")
        
    result = await analyze_resume(role, category, experience, file, user_id=user_id)
    return result

@app.post("/generate_cover_letter")
async def generate_cover(
    cover_letter: CoverLetterCreate,
    user: dict = Depends(get_current_active_user)
):
    user_id = user.get("id") if isinstance(user, dict) else getattr(user, "id", None)
    
    if not user_id:
        raise HTTPException(status_code=401, detail="Valid user context missing")
        
    # Inject reliable user_id from token
    cover_letter.user_id = user_id
    
    result = await generate_cover_letter(cover_letter)
    
    if isinstance(result, dict) and "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
        
    return {
        "message": "Created",
        "data": result
    }


@app.post("/generate_email_draft")
async def generate_email(
    email_draft:EmailCreate ,
    user: dict = Depends(get_current_active_user)
):
    user_id = user.get("id") if isinstance(user, dict) else getattr(user, "id", None)
    
    if not user_id:
        raise HTTPException(status_code=401, detail="Valid user context missing")
            
    # Inject reliable user_id from token
    email_draft.user_id = user_id
        
    result = await generate_email_draft(email_draft)
        
    if isinstance(result, dict) and "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
            
    return {
        "message": "Created",
        "data": result
    }





    




