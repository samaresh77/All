class TaskManager:
    def __init__(self):
        self.tasks = []

    def add_task(self):
        task = input("Enter new task: ")
        self.tasks.append(task)
        print("Task added!")

    def view_tasks(self):
        if not self.tasks:
            print("No tasks yet.")
        else:
            for i, t in enumerate(self.tasks, start=1):
                print(f"{i}. {t}")

    def remove_task(self):
        self.view_tasks()
        try:
            num = int(input("Enter task number to remove: "))
            if 1 <= num <= len(self.tasks):
                removed = self.tasks.pop(num - 1)
                print(f"Removed: {removed}")
            else:
                print("Invalid number.")
        except ValueError:
            print("Enter a valid number.")

    def run(self):
        while True:
            print("\n1. Add  2. View  3. Remove  4. Exit")
            choice = input("Choose: ")

            if choice == "1":
                self.add_task()
            elif choice == "2":
                self.view_tasks()
            elif choice == "3":
                self.remove_task()
            elif choice == "4":
                print("Bye 👋")
                break
            else:
                print("Invalid choice")


app = TaskManager()
app.run()
