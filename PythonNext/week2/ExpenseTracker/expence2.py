# FILE_NAME = "expenses.txt"
file_path = "PythonNext/week2/ExpenseTracker/expenses.txt"
FILE_NAME = file_path


def add_expense():
    category = input("Enter category: ")
    amount = input("Enter amount: ")

    with open(FILE_NAME, "a") as file:
        file.write(f"{category},{amount}\n")

    print("Expense added successfully ✅")


def view_expenses():
    try:
        with open(FILE_NAME, "r") as file:
            expenses = file.readlines()

        if not expenses:
            print("No expenses found.")
            return

        print("\n--- All Expenses ---")
        for line in expenses:
            category, amount = line.strip().split(",")
            print(f"Category: {category}, Amount: ₹{amount}")

    except FileNotFoundError:
        print("No expenses file found.")


def total_spent():
    total = 0
    try:
        with open(FILE_NAME, "r") as file:
            for line in file:
                _, amount = line.strip().split(",")
                total += float(amount)

        print(f"\nTotal spent: ₹{total}")

    except FileNotFoundError:
        print("No expenses file found.")


def menu():
    while True:
        print("\n--- Expense Tracker ---")
        print("1. Add Expense")
        print("2. View All Expenses")
        print("3. Show Total Spent")
        print("4. Exit")

        choice = input("Choose an option (1-4): ")

        if choice == "1":
            add_expense()
        elif choice == "2":
            view_expenses()
        elif choice == "3":
            total_spent()
        elif choice == "4":
            print("Goodbye 👋")
            break
        else:
            print("Invalid choice. Try again.")


menu()
