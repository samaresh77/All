from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    app_name: str = "FastAPI Masterclass"
    debug: bool = True
    version: str = "1.0.0"
    secret_key: str = "your-secret-key-here-change-in-production"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    database_url: str = "sqlite:///./fastapi_master.db"
    
    class Config:
        env_file = ".env"


@lru_cache()
def get_settings():
    return Settings()