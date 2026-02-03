import random

result = random.randint(1, 50)
attempts = 0

while True:
    try:
        guess = int(input("Enter a number between 1 and 50: "))
        attempts += 1
    except ValueError:
        print("Please enter a valid number!")
        continue

    if guess > result:
        print("Too High!")
    elif guess < result:
        print("Too Low!")
    else:
        print(f"You are Right 🎉 and you took {attempts} attempts.")
        break

# Use try except block