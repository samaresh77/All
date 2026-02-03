from flask import Flask, render_template, request, redirect
import sqlite3

app = Flask(__name__)

def get_db():
    return sqlite3.connect("tasks.db")

@app.route("/", methods=["GET", "POST"])
def index():
    db = get_db()
    cursor = db.cursor()

    if request.method == "POST":
        task = request.form["task"]
        cursor.execute("INSERT INTO tasks (name) VALUES (?)", (task,))
        db.commit()

    cursor.execute("SELECT * FROM tasks")
    tasks = cursor.fetchall()
    db.close()

    return render_template("index.html", tasks=tasks)

@app.route("/delete/<int:id>")
def delete(id):
    db = get_db()
    db.execute("DELETE FROM tasks WHERE id=?", (id,))
    db.commit()
    db.close()
    return redirect("/")

app.run(debug=True)
