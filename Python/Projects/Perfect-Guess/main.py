import random

result = random.randint(1, 100)
count = 0
guess = -1
while(guess != result) :
    guess = int(input("Enter the number: "))
    if(guess<result) :
        print("result is higher!")
        count += 1
    else :
        print("result is lower!")
        count += 1
print(f"You guess the number at {count} attemps and number is {result}")