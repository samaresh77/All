num = int(input("Enter a number: "))

if num % 3 == 0 and num % 5 == 0:
    print("FizzBuzz")
elif num % 3 == 0:
    print("Fizz")
elif num % 5 == 0:
    print("Buzz")
elif num % 2 == 0:
    print(f"{num} is even.")
else:
    print(f"{num} is odd.")

# 🧠 Big Lesson You Just Learned

# 👉 Order of conditions matters