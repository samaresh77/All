# print("Hello, World!")

# factorial of a number
# def factorial(num) :
#     if(num == 0 or num == 1) :
#         return 1
#     return num*factorial(num-1)
# num = int(input("Enter a number: "))
# print(f"factorial of {num} is {factorial(num)}")

# Reverse a string
# def reverse(str) :
#     str = str[::-1]
#     return str
# str = input("Enter a string: ")
# print(reverse(str))

# generate a random password
import random
import string

# Ask user for password length
length = int(input("Enter password length: "))

# Characters to use
characters = string.ascii_letters + string.digits + string.punctuation

# Generate password
password = ""
for i in range(length):
    password += random.choice(characters)

print("Generated Password:", password)
