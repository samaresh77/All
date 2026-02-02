print("Smart Calculator is running!")
num1 = int(input("Enter First number: "))
operator = input("Enter operator (+, -, *, /): ")
num2 = int(input("Enter Second number: "))
if operator == '+':
    print(f"{num1} + {num2} = {num1 + num2}")
elif operator == '-':
    print(f"{num1} - {num2} = {num1 - num2}")
elif operator == '*':
    print(f"{num1} * {num2} = {num1 * num2}")
elif operator == '/':
    if num2 != 0:
        print(f"{num1} / {num2} = {num1 / num2}")
    else:
        print("Error: Division by zero is not allowed.")
else:
    print("Error: Invalid operator.")
