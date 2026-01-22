from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: str
    created_at: datetime
    games_played: int
    total_score: int
    
    class Config:
        from_attributes = True

class GameScore(BaseModel):
    score: int
    level: int
    snake_length: int
    duration: Optional[int] = 0

class LeaderboardEntry(BaseModel):
    id: str
    username: str
    score: int
    level: int
    snake_length: int
    date: str
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None