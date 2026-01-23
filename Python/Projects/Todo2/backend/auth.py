from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
import json

auth = Blueprint("auth", __name__)

USERS_FILE = "users.json"

def load_users():
    try:
        with open(USERS_FILE) as f:
            return json.load(f)
    except:
        return []

@auth.route("/login", methods=["POST"])
def login():
    data = request.json
    users = load_users()

    for user in users:
        if user["username"] == data["username"] and user["password"] == data["password"]:
            token = create_access_token(identity=user["username"])
            return jsonify(access_token=token)

    return jsonify({"error": "Invalid credentials"}), 401
