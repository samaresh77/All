# Rock Paper Scissors Game
import random
user_score = 0
computer_score = 0

def get_user_choice():
    choices = ['rock', 'paper', 'scissors']
    user_input = input("Enter your choice (rock, paper, scissors): ").lower()
    while user_input not in choices:
        print("Invalid choice. Please try again.")
        user_input = input("Enter your choice (rock, paper, scissors): ").lower()
    return user_input

def get_computer_choice():
    choices = ['rock', 'paper', 'scissors']
    return random.choice(choices)

def determine_winner(user_choice, computer_choice):
    if user_choice == computer_choice:
        return "It's a tie!"
    elif (user_choice == 'rock' and computer_choice == 'scissors') or \
         (user_choice == 'paper' and computer_choice == 'rock') or \
         (user_choice == 'scissors' and computer_choice == 'paper'):
        global user_score
        user_score += 1
        return "You win!"
    else:
        global computer_score
        computer_score += 1
        return "Computer wins!"
    
    
def play_game():
    print("Welcome to Rock, Paper, Scissors!")

    while True:
        user_choice = get_user_choice()
        computer_choice = get_computer_choice()

        print(f"You chose: {user_choice}")
        print(f"Computer chose: {computer_choice}")
        print(determine_winner(user_choice, computer_choice))
        print(f"Score - You: {user_score}, Computer: {computer_score}")

        again = input("Play again? (y/n): ").lower()
        if again != 'y':
            print("Thanks for playing! 👋")
            break

if __name__ == "__main__":
    play_game()