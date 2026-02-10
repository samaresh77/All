from fastapi import FastAPI

# 1. Initialize the API
app = FastAPI()

# 2. Define a GET endpoint for the home page
@app.get("/")
def read_root():
    return {"message": "Welcome to my API!"}

# 3. Define a GET endpoint that takes a parameter
@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "query_param": q}