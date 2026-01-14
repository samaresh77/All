# self : self represents the instance of the class.
# By using the "self" keyword we can access the attributes and methods of the class in python.
# It binds the attributes with the given arguments.

class Person:
    def __init__(self, name, age):
        self.name = name  # instance variable
        self.age = age    # instance variable

    def display(self):
        print("Name:", self.name)
        print("Age:", self.age)
# Creating an instance of the Person class
person1 = Person("Alice", 30)
# Calling the display method
person1.display()

# Output:
# Name: Alice
# Age: 30

# Here, 'self.name' and 'self.age' are instance variables that are unique to each instance of the Person class. The 'self' parameter in the methods allows us to access these variables and methods associated with the instance.
# Note: The name 'self' is not a keyword in Python. It is just a convention. You can use any other name instead of 'self', but it is highly recommended to use 'self' for better readability and understanding of the code.

# Example with different name instead of 'self'
class Animal:
    def __init__(this, species, sound):
        this.species = species
        this.sound = sound

    def make_sound(this):
        print(f"The {this.species} says {this.sound}")
# Creating an instance of the Animal class
animal1 = Animal("Dog", "Woof")
# Calling the make_sound method
animal1.make_sound()

# Output:
# The Dog says Woof

# In this example, we used 'this' instead of 'self', and it works the same way. However, using 'self' is the standard practice in Python.
# self : self represents the instance of the class.
# By using the "self" keyword we can access the attributes and methods of the class in python.
# It binds the attributes with the given arguments.

# difference between self and __init__
# 'self' is a reference to the current instance of the class, while '__init__' is a special method (also known as a constructor) 
# that is automatically called when a new instance of the class is created. 
# The '__init__' method is used to initialize the attributes of the class using the 'self' reference.


