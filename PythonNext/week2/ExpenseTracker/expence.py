# expence tracker
class Expense:
    def __init__(self, amount, category, date, description):
        self.amount = amount
        self.category = category
        self.date = date
        self.description = description

    def __repr__(self):
        return f"Expense(amount={self.amount}, category='{self.category}', date='{self.date}', description='{self.description}')"
    
class ExpenseTracker:
    def __init__(self):
        self.expenses = []

    def add_expense(self, expense):
        self.expenses.append(expense)

    def get_expenses(self):
        return self.expenses

    def get_total_expense(self):
        return sum(expense.amount for expense in self.expenses)

    def get_expenses_by_category(self, category):
        return [expense for expense in self.expenses if expense.category == category]
    def get_expenses_by_date(self, date):
        return [expense for expense in self.expenses if expense.date == date]
    def remove_expense(self, expense):
        if expense in self.expenses:
            self.expenses.remove(expense)
            return True
        return False
    def clear_expenses(self):
        self.expenses.clear()
# Example usage:
if __name__ == "__main__":
    tracker = ExpenseTracker()
    
    expense1 = Expense(50, "Food", "2023-10-01", "Lunch at restaurant")
    expense2 = Expense(20, "Transport", "2023-10-01", "Taxi fare")
    expense3 = Expense(100, "Shopping", "2023-10-02", "Clothes")
    
    tracker.add_expense(expense1)
    tracker.add_expense(expense2)
    tracker.add_expense(expense3)
    
    print("All Expenses:", tracker.get_expenses())
    print("Total Expense:", tracker.get_total_expense())
    print("Food Expenses:", tracker.get_expenses_by_category("Food"))
    print("Expenses on 2023-10-01:", tracker.get_expenses_by_date("2023-10-01"))
    
    tracker.remove_expense(expense2)
    print("Expenses after removal:", tracker.get_expenses())
    
    tracker.clear_expenses()
    print("Expenses after clearing:", tracker.get_expenses())
