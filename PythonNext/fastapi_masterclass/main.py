"""
FastAPI Masterclass - Main Application Entry Point

Run with: uvicorn main:app --reload
Swagger UI: http://localhost:8000/docs
Redoc: http://localhost:8000/redoc
"""

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import time

from config import get_settings
from database import init_db

# Import module routers
from modules.01_beginner.routes import router as beginner_router
from modules.02_intermediate.routes import router as intermediate_router
from modules.03_advanced.routes import router as advanced_router
from modules.04_expert.routes import router as expert_router

settings = get_settings()

# Create FastAPI app with metadata
app = FastAPI(
    title=settings.app_name,
    description="""
    🚀 **FastAPI Masterclass** - Learn FastAPI from Beginner to Advanced!
    
    ## Modules
    
    ### 🌱 Beginner (`/beginner`)
    - Basic routing and HTTP methods
    - Path and Query parameters
    - Request/Response models
    
    ### 🚀 Intermediate (`/intermediate`)
    - Pydantic validation
    - Dependencies and dependency injection
    - Headers and metadata
    
    ### 🔐 Advanced (`/advanced`)
    - Database integration with SQLAlchemy
    - JWT Authentication
    - File uploads
    
    ### ⚡ Expert (`/expert`)
    - Background tasks
    - WebSockets
    - Streaming responses
    
    ## Authentication
    Most advanced endpoints require JWT authentication:
    1. Register at `POST /advanced/register`
    2. Login at `POST /advanced/token`
    3. Click **Authorize** button and enter: `Bearer <your_token>`
    
    ## Testing
    Run tests with: `pytest modules/05_master/test_main.py -v`
    """,
    version=settings.version,
    contact={
        "name": "FastAPI Masterclass",
        "url": "https://github.com/yourusername/fastapi-masterclass",
    },
    license_info={
        "name": "MIT",
        "url": "https://opensource.org/licenses/MIT",
    },
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure for production!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add timing middleware
@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response


# Custom exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal server error",
            "detail": str(exc) if settings.debug else "Something went wrong"
        }
    )


# Include routers
app.include_router(beginner_router)
app.include_router(intermediate_router)
app.include_router(advanced_router)
app.include_router(expert_router)


@app.on_event("startup")
async def startup_event():
    """Initialize database on startup"""
    init_db()
    print("🚀 FastAPI Masterclass started!")
    print("📚 Swagger UI: http://localhost:8000/docs")
    print("🔍 Redoc: http://localhost:8000/redoc")


@app.get("/", tags=["Root"])
async def root():
    """Root endpoint with navigation help"""
    return {
        "message": "Welcome to FastAPI Masterclass!",
        "docs": "/docs",
        "redoc": "/redoc",
        "modules": {
            "beginner": "/beginner/",
            "intermediate": "/intermediate/",
            "advanced": "/advanced/",
            "expert": "/expert/"
        }
    }


@app.get("/health", tags=["System"])
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "version": settings.version,
        "timestamp": time.time()
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)