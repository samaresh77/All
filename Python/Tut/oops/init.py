# init method : The __init__ method is a special method in Python classes.
# It is called a constructor and is automatically invoked when a new instance of the class is created.
# The primary purpose of the __init__ method is to initialize the attributes of the class.

class Employee:
    salary = 50000  # class variable
    language = "Python"  # class variable

    def __init__(self): # default constructor
        print("Employee object is created.")

    def getInfo(self):
        print(f"Salary: {self.salary} and Language: {self.language}")

# Creating an instance of the Employee class
emp1 = Employee()
emp1.getInfo()


class Car:
    def __init__(self, make, model, year):
        self.make = make    # instance variable
        self.model = model  # instance variable
        self.year = year    # instance variable

    def display_info(self):
        print(f"Car Make: {self.make}")
        print(f"Car Model: {self.model}")
        print(f"Car Year: {self.year}")
# Creating an instance of the Car class
car1 = Car("Toyota", "Camry", 2020)
# Calling the display_info method
car1.display_info()

