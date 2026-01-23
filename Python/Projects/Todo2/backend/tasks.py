from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
import json, uuid

tasks_api = Blueprint("tasks", __name__)
TASKS_FILE = "tasks.json"

def load_tasks():
    try:
        with open(TASKS_FILE) as f:
            return json.load(f)
    except:
        return []

def save_tasks(tasks):
    with open(TASKS_FILE, "w") as f:
        json.dump(tasks, f, indent=4)

@tasks_api.route("/tasks", methods=["GET"])
@jwt_required()
def get_tasks():
    return jsonify(load_tasks())

@tasks_api.route("/tasks", methods=["POST"])
@jwt_required()
def add_task():
    data = request.json
    tasks = load_tasks()

    task = {
        "id": str(uuid.uuid4()),
        "title": data["title"],
        "done": False,
        "due_date": data["due_date"],
        "priority": data["priority"]
    }

    tasks.append(task)
    save_tasks(tasks)
    return jsonify(task), 201
