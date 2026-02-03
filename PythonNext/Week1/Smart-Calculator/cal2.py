print("Smart Calculator is running!")

def calculator():
    try:
        num1 = float(input("Enter First number: "))
        operator = input("Enter operator (+, -, *, /): ")
        num2 = float(input("Enter Second number: "))

        if operator == '+':
            # print(f"{num1} + {num2} = {num1 + num2}")
            return num1 + num2
        elif operator == '-':
            # print(f"{num1} - {num2} = {num1 - num2}")
            return num1 - num2
        elif operator == '*':
            # print(f"{num1} * {num2} = {num1 * num2}")
            return num1 * num2
        elif operator == '/':
            if num2 != 0:
                # print(f"{num1} / {num2} = {num1 / num2}")
                return num1 / num2
            else:
                print("Error: Division by zero is not allowed.")
        else:
            print("Error: Invalid operator.")
    except ValueError:
        print("Error: Please enter valid numbers.")
        return

if __name__ == "__main__":
    # calculator()
    print(calculator())