tasks = []

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


# enumerate() function adds a counter to each item in a list or any other iterable, 
# and returns a list of tuples containing the index position and the element for each 
# element of the iterable.

# a = ["Geeks", "for", "Geeks"]

# # Iterating list using enumerate to get both index and element
# for i, name in enumerate(a):
#     print(f"Index {i}: {name}")

# # Converting to a list of tuples
# print(list(enumerate(a)))
