from fastapi import FastAPI, Depends, HTTPException, status
from database.db import supabase
from schemas.UserSchemas import Users, Token, TokenData, UserLogin
from auth.auth import verify_password, create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES, get_password_hash, get_current_active_user, current_user
from fastapi.security import OAuth2PasswordRequestForm
from typing import Optional
from datetime import timedelta


app = FastAPI()

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





