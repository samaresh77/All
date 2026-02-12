from fastapi import FastAPI

app = FastAPI()

@app.get("/python")
def read_root():
    return {"message": "Hello from Python 🐍"}