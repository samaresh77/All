from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(
    title="My First Python API",
    description="A basic FastAPI project with Swagger UI",
    version="1.0.0"
)

# Temporary database (in-memory)
users_db = []

# -------------------
# Basic Route
# -------------------
@app.get("/")
def home():
    return {"message": "Welcome to my API 🚀"}


# -------------------
# Path Parameter
# -------------------
@app.get("/hello/{name}")
def say_hello(name: str):
    return {"greeting": f"Hello, {name}!"}


# -------------------
# Query Parameter
# -------------------
@app.get("/add")
def add_numbers(a: int, b: int):
    return {
        "a": a,
        "b": b,
        "sum": a + b
    }


# -------------------
# POST API with Body
# -------------------
class User(BaseModel):
    name: str
    email: str
    age: int


# CREATE USER
@app.post("/users")
def create_user(user: User):
    users_db.append(user)
    return {
        "message": "User created successfully",
        "user": user
    }


# GET ALL USERS
@app.get("/users")
def get_all_users():
    return {
        "total_users": len(users_db),
        "users": users_db
    }