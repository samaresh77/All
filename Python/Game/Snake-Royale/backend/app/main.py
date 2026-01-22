from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import datetime, timedelta
from typing import List, Optional
import os
from dotenv import load_dotenv

from . import models, auth, database

load_dotenv()

app = FastAPI(
    title="Snake Royale API",
    description="Full-stack Snake game with leaderboard and authentication",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database connection
db = database.get_database()

# OAuth2 scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await auth.authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user["username"]}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/register", response_model=models.UserResponse)
async def register(user: models.UserCreate):
    existing_user = await db.users.find_one({"username": user.username})
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    
    hashed_password = auth.get_password_hash(user.password)
    db_user = {
        "username": user.username,
        "email": user.email,
        "hashed_password": hashed_password,
        "created_at": datetime.utcnow(),
        "games_played": 0,
        "total_score": 0
    }
    
    result = await db.users.insert_one(db_user)
    return {**db_user, "id": str(result.inserted_id)}

@app.get("/users/me", response_model=models.UserResponse)
async def read_users_me(token: str = Depends(oauth2_scheme)):
    username = auth.verify_token(token)
    if username is None:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    user = await db.users.find_one({"username": username})
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    user["id"] = str(user["_id"])
    return user

@app.post("/game/save")
async def save_game_score(score_data: models.GameScore, token: str = Depends(oauth2_scheme)):
    username = auth.verify_token(token)
    if username is None:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    # Update user stats
    await db.users.update_one(
        {"username": username},
        {
            "$inc": {"games_played": 1, "total_score": score_data.score},
            "$set": {"last_played": datetime.utcnow()}
        }
    )
    
    # Save to leaderboard
    leaderboard_entry = {
        "username": username,
        "score": score_data.score,
        "level": score_data.level,
        "snake_length": score_data.snake_length,
        "date": datetime.utcnow()
    }
    
    result = await db.leaderboard.insert_one(leaderboard_entry)
    leaderboard_entry["id"] = str(result.inserted_id)
    
    return {"message": "Score saved successfully", "entry": leaderboard_entry}

@app.get("/leaderboard", response_model=List[models.LeaderboardEntry])
async def get_leaderboard(limit: int = 20):
    entries = await db.leaderboard.find().sort("score", -1).limit(limit).to_list(length=limit)
    
    for entry in entries:
        entry["id"] = str(entry["_id"])
        entry["date"] = entry["date"].isoformat()
    
    return entries

@app.get("/leaderboard/user/{username}")
async def get_user_entries(username: str, limit: int = 10):
    entries = await db.leaderboard.find({"username": username})\
        .sort("score", -1)\
        .limit(limit)\
        .to_list(length=limit)
    
    for entry in entries:
        entry["id"] = str(entry["_id"])
        entry["date"] = entry["date"].isoformat()
    
    return entries

# Add this endpoint to check MongoDB connection
@app.get("/health/db")
async def check_database_health():
    try:
        # Try to ping the database
        await db.command('ping')
        return {
            "status": "healthy",
            "database": "connected",
            "timestamp": datetime.utcnow().isoformat()
        }
    except Exception as e:
        raise HTTPException(
            status_code=503,
            detail=f"Database connection failed: {str(e)}"
        )

# Update the existing health endpoint
@app.get("/health")
async def health_check():
    try:
        await db.command('ping')
        db_status = "connected"
    except:
        db_status = "disconnected"
    
    return {
        "status": "healthy",
        "database": db_status,
        "timestamp": datetime.utcnow().isoformat(),
        "service": "Snake Royale API",
        "version": "1.0.0"
    }