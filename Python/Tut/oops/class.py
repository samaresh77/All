# Oops : Oops stands for Object Oriented Programming System, which is a programming paradigm based on the concept of "objects".
# In Python, OOPs allows us to structure our code in a way that is modular, reusable, and easier to maintain.

# Class : A class is a blueprint for creating objects. It defines a set of attributes and methods that the created objects will have.

# Example of a class in Python

class Dog:
    # Attributes
    species = "Canis familiaris"

    # Initializer / Instance attributes
    def __init__(self, name, age):
        self.name = name
        self.age = age

    # Method
    def bark(self):
        return f"{self.name} says Woof!"
    
# Creating an object (instance) of the Dog class
my_dog = Dog("Buddy", 3)
print(f"My dog's name is {my_dog.name} and he is {my_dog.age} years old.")
print(my_dog.bark())

# class attributes vs instance attributes vs object attributes
class Student:
    # class attribute
    school_name = "ABC High School"

    def __init__(self, name, grade):
        # instance attributes
        self.name = name
        self.grade = grade
        
        # object attribute
        self.attendance = 0
    def attend_class(self):
        self.attendance += 1
        return f"{self.name} has attended {self.attendance} classes."
    
# Creating an object of the Student class
student1 = Student("Alice", "10th Grade")
print(f"{student1.name} studies at {Student.school_name}.")
print(student1.attend_class())
print(student1.attend_class())
