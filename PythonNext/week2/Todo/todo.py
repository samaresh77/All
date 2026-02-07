file_path = "PythonNext/week2/Todo/tasks.txt"
FILE_NAME = file_path

# Load tasks from file
def load_tasks():
    try:
        with open(FILE_NAME, "r") as f:
            return [line.strip() for line in f.readlines()]
    except FileNotFoundError:
        return []

# Save tasks to file
def save_tasks(tasks):
    with open(FILE_NAME, "w") as f:
        for task in tasks:
            f.write(task + "\n")

tasks = load_tasks()

while True:
    print("\nChoose option:")
    print("1. Add task")
    print("2. View tasks")
    print("3. Remove task")
    print("4. Exit")

    choice = input("Enter choice (1-4): ")

    if choice == '1':
        task = input("Enter new task: ")
        tasks.append(task)
        save_tasks(tasks)
        print("Task added!")

    elif choice == '2':
        if not tasks:
            print("No tasks yet.")
        else:
            print("\nYour Tasks:")
            for i, t in enumerate(tasks, start=1):
                print(f"{i}. {t}")

    elif choice == '3':
        if not tasks:
            print("No tasks to remove.")
        else:
            for i, t in enumerate(tasks, start=1):
                print(f"{i}. {t}")
            try:
                num = int(input("Enter task number to remove: "))
                if 1 <= num <= len(tasks):
                    removed = tasks.pop(num - 1)
                    save_tasks(tasks)
                    print(f"Removed task: {removed}")
                else:
                    print("Invalid task number.")
            except ValueError:
                print("Please enter a valid number.")

    elif choice == '4':
        print("Goodbye 👋")
        break

    else:
        print("Invalid choice. Try again.")
