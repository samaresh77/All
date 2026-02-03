num = int(input("Enter a number: "))

if num % 2 == 0:
    print(f"{num} is even.")
elif num % 3 == 0 and num % 5 == 0:
    print("FizzBuzz")
else:
    print(f"{num} is odd.")

