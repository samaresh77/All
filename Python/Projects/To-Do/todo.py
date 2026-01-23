import json
import os

FILE_NAME = "tasks.json"

def load_tasks():
    if os.path.exists(FILE_NAME):
        with open(FILE_NAME, "r") as f:
            return json.load(f)
    return []

def save_tasks(tasks):
    with open(FILE_NAME, "w") as f:
        json.dump(tasks, f, indent=4)

def show_tasks(tasks):
    if not tasks:
        print("\n📭 No tasks found!")
        return

    print("\n📋 Your Tasks:")
    for i, task in enumerate(tasks, 1):
        status = "✅" if task["done"] else "❌"
        print(f"{i}. {task['title']} {status}")

def add_task(tasks):
    title = input("Enter task name: ")
    tasks.append({"title": title, "done": False})
    save_tasks(tasks)
    print("✅ Task added!")

def mark_done(tasks):
    show_tasks(tasks)
    try:
        index = int(input("Enter task number to mark done: ")) - 1
        tasks[index]["done"] = True
        save_tasks(tasks)
        print("🎉 Task completed!")
    except:
        print("⚠️ Invalid input!")

def delete_task(tasks):
    show_tasks(tasks)
    try:
        index = int(input("Enter task number to delete: ")) - 1
        removed = tasks.pop(index)
        save_tasks(tasks)
        print(f"🗑️ Deleted: {removed['title']}")
    except:
        print("⚠️ Invalid input!")

def main():
    tasks = load_tasks()

    while True:
        print("\n=== 📝 TO-DO APP ===")
        print("1. Show Tasks")
        print("2. Add Task")
        print("3. Mark Task as Done")
        print("4. Delete Task")
        print("5. Exit")

        choice = input("Choose an option: ")

        if choice == "1":
            show_tasks(tasks)
        elif choice == "2":
            add_task(tasks)
        elif choice == "3":
            mark_done(tasks)
        elif choice == "4":
            delete_task(tasks)
        elif choice == "5":
            print("👋 Goodbye!")
            break
        else:
            print("❌ Invalid choice!")

if __name__ == "__main__":
    main()
