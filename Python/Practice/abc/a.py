# print("Hello, World!")

# factorial of a number
# def factorial(num) :
#     if(num == 0 or num == 1) :
#         return 1
#     return num*factorial(num-1)
# num = int(input("Enter a number: "))
# print(f"factorial of {num} is {factorial(num)}")

# Reverse a string
def reverse(str) :
    str = str[::-1]
    return str
str = input("Enter a string: ")
print(reverse(str))