from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "https://redesigned-potato-g9x6r7q66gj29gvr-5173.app.github.dev"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,   # or ["*"] for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/python")
def read_root():
    return {"message": "Hello from Python 🐍"}