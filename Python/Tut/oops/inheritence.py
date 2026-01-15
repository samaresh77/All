# Inheritence in Python
# Inheritance is a fundamental concept in object-oriented programming (OOP) that allows a class
# (called the child class or subclass) to inherit attributes and methods from another class
# (called the parent class or superclass). This promotes code reusability and establishes a
# hierarchical relationship between classes.

# Example of Inheritance
# single inheritance
class Animal:
    def speak(self):
        return "Animal speaks."
class Dog(Animal):
    def bark(self):
        return "Dog barks."
# Creating an instance of Dog
dog = Dog()
print(dog.speak())  # Output: Animal speaks.
print(dog.bark())   # Output: Dog barks.

# multi-level inheritance
class Vehicle:
    def start(self):
        return "Vehicle started."
class Car(Vehicle):
    def drive(self):
        return "Car is driving."
class ElectricCar(Car):
    def charge(self):
        return "Electric car is charging."
# Creating an instance of ElectricCar
tesla = ElectricCar()
print(tesla.start())  # Output: Vehicle started.
print(tesla.drive())  # Output: Car is driving.
print(tesla.charge()) # Output: Electric car is charging.

# multiple inheritance
class Flyer:
    def fly(self):
        return "Flying in the sky."
class Swimmer:
    def swim(self):
        return "Swimming in the water."
class Duck(Flyer, Swimmer):
    def quack(self):
        return "Quack! Quack!"
# Creating an instance of Duck
donald = Duck()
print(donald.fly())   # Output: Flying in the sky.
print(donald.swim())  # Output: Swimming in the water.
print(donald.quack()) # Output: Quack! Quack!

# hierarchical inheritance
class Parent:
    def greet(self):
        return "Hello from Parent class."
class Child1(Parent):
    def greet(self):
        return "Hello from Child1 class."
class Child2(Parent):
    def greet(self):
        return "Hello from Child2 class."
# Creating instances of Child1 and Child2
child1 = Child1()
child2 = Child2()
print(child1.greet())  # Output: Hello from Child1 class.
print(child2.greet())  # Output: Hello from Child2 class.

# hybrid inheritance
class A:
    def method_a(self):
        return "Method from class A."
class B(A):
    def method_b(self):
        return "Method from class B."
class C(A):
    def method_c(self):
        return "Method from class C."
class D(B, C):
    def method_d(self):
        return "Method from class D."
# Creating an instance of D
d_instance = D()
print(d_instance.method_a())  # Output: Method from class A.
print(d_instance.method_b())  # Output: Method from class B.
print(d_instance.method_c())  # Output: Method from class C.
print(d_instance.method_d())  # Output: Method from class D.
# Note: In cases of multiple inheritance, Python uses the C3 Linearization algorithm
# (also known as Method Resolution Order or MRO) to determine the order in which
# base classes are searched when executing a method. You can check the MRO of a class
# using the __mro__ attribute or the mro() method.
print(D.__mro__)
# Output: (<class '__main__.D'>, <class '__main__.B'>, <class '__main__.C'>, <class '__main__.A'>, <class 'object'>)

# super() function
class Parent:
    def show(self):
        return "Parent class method."
class Child(Parent):
    def show(self):
        parent_message = super().show()  # Calling the parent class method
        return f"{parent_message} Child class method."
# Creating an instance of Child
child = Child()
print(child.show())  # Output: Parent class method. Child class method.



