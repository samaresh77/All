# Decorators in Python
# A decorator is a special type of function that modifies the behavior of another function.
# Decorators allow you to wrap another function to extend its behavior without modifying its code.

# Example of a simple decorator
def my_decorator(func):
    def wrapper():
        print("Something is happening before the function is called.")
        func()
        print("Something is happening after the function is called.")
    return wrapper
@my_decorator
def say_hello():
    print("Hello!")
# Calling the decorated function
say_hello()
        return "Hello from Child2 class."
# Creating instances of Child1 and Child2
child1 = Child1()
child2 = Child2()
print(child1.greet())  # Output: Hello from Child1 class.
print(child2.greet())  # Output: Hello from Child2 class.

# Output:
# Something is happening before the function is called.
# Hello!
# Something is happening after the function is called.

# Decorators with arguments
def repeat(num_times):
    def decorator_repeat(func):
        def wrapper(*args, **kwargs):
            for _ in range(num_times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator_repeat 
@repeat(num_times=3)
def greet(name):
    print(f"Hello, {name}!")
# Calling the decorated function
greet("Alice")
# Output:
# Hello, Alice!
# Hello, Alice!
# Hello, Alice!

# Decorators can also be used for logging, access control, instrumentation, and caching.
# Example of a logging decorator
def log_function_call(func):
    def wrapper(*args, **kwargs):
        print(f"Calling function '{func.__name__}' with arguments {args} and keyword arguments {kwargs}")
        result = func(*args, **kwargs)
        print(f"Function '{func.__name__}' returned {result}")
        return result
    return wrapper
@log_function_call
def add(a, b):
    return a + b
# Calling the decorated function
add(5, 3)
# Output:
# Calling function 'add' with arguments (5, 3) and keyword arguments {}
# Function 'add' returned 8

# Note: When using decorators, the original function's metadata (like its name and docstring)
# is lost because the wrapper function replaces it. To preserve the original function's metadata,
# you can use the functools.wraps decorator from the functools module.
import functools
def my_decorator(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        print("Before calling the function.")
        result = func(*args, **kwargs)
        print("After calling the function.")
        return result
    return wrapper
@my_decorator
def say_goodbye():
    """This function says goodbye."""
    print("Goodbye!")
# Calling the decorated function
say_goodbye()
print(say_goodbye.__name__)  # Output: say_goodbye
print(say_goodbye.__doc__)   # Output: This function says goodbye.

# Output:
# Before calling the function.
# Goodbye!  
# After calling the function.
# say_goodbye
# This function says goodbye.

# Decorators are a powerful feature in Python that can help you write cleaner and more maintainable code by separating concerns and enhancing functionality.
# They are widely used in web frameworks, logging libraries, and many other applications.
