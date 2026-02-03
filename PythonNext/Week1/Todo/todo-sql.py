import sqlite3

conn = sqlite3.connect("tasks.db")
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
)
""")
conn.commit()

def add_task():
    task = input("Enter task: ")
    cursor.execute("INSERT INTO tasks (name) VALUES (?)", (task,))
    conn.commit()

def view_tasks():
    cursor.execute("SELECT * FROM tasks")
    rows = cursor.fetchall()
    for r in rows:
        print(f"{r[0]}. {r[1]}")

def remove_task():
    view_tasks()
    task_id = input("Enter task ID to remove: ")
    cursor.execute("DELETE FROM tasks WHERE id=?", (task_id,))
    conn.commit()

while True:
    print("\n1. Add  2. View  3. Remove  4. Exit")
    choice = input("Choose: ")

    if choice == "1":
        add_task()
    elif choice == "2":
        view_tasks()
    elif choice == "3":
        remove_task()
    elif choice == "4":
        break

conn.close()
