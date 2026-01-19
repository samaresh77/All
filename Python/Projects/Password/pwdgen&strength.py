import random
import string

# -------------------------------
# Password Strength Checker
# -------------------------------
def check_password_strength(password):
    score = 0

    if len(password) >= 8:
        score += 1
    if any(char.isupper() for char in password):
        score += 1
    if any(char.islower() for char in password):
        score += 1
    if any(char.isdigit() for char in password):
        score += 1
    if any(not char.isalnum() for char in password):
        score += 1

    if score <= 2:
        return "Weak ❌"
    elif score <= 4:
        return "Medium ⚠️"
    else:
        return "Strong ✅"


# -------------------------------
# Password Generator
# -------------------------------
def generate_password(length):
    characters = string.ascii_letters + string.digits + string.punctuation
    password = ""

    for _ in range(length):
        password += random.choice(characters)

    return password


# -------------------------------
# Main Program
# -------------------------------
print("🔐 Password Tool")
print("1. Generate Password")
print("2. Check Password Strength")
print("3. Generate & Check Strength")

choice = input("Choose an option (1/2/3): ")

if choice == "1":
    length = int(input("Enter password length: "))
    pwd = generate_password(length)
    print("Generated Password:", pwd)

elif choice == "2":
    pwd = input("Enter password to check: ")
    print("Password Strength:", check_password_strength(pwd))

elif choice == "3":
    length = int(input("Enter password length: "))
    pwd = generate_password(length)
    strength = check_password_strength(pwd)

    print("Generated Password:", pwd)
    print("Password Strength:", strength)

    if strength == "Weak ❌":
        print("⚠️ Password is weak, try generating again!")

else:
    print("❌ Invalid choice")
