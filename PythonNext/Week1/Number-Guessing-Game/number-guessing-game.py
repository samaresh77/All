import random

result = random.randint(1,100)
attemps = 1
guess = int(input("Enter a number: "))
while result != guess : 
    if guess > result :
        print("Too High!")
        attemps += 1
    else :
        print("Too Low!")
        attemps += 1
    guess = int(input("Enter a number: "))

print(f"you are Right🎉 and you take {attemps} attemps.")