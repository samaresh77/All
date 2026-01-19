def check_password_strength(password):
    score = 0

    # Rule 1: Length
    if len(password) >= 8:
        score += 1

    # Rule 2: Uppercase letter
    if any(char.isupper() for char in password):
        score += 1

    # Rule 3: Lowercase letter
    if any(char.islower() for char in password):
        score += 1

    # Rule 4: Number
    if any(char.isdigit() for char in password):
        score += 1

    # Rule 5: Special character
    if any(not char.isalnum() for char in password):
        score += 1

    # Strength decision
    if score <= 2:
        return "Weak ❌"
    elif score <= 4:
        return "Medium ⚠️"
    else:
        return "Strong ✅"


# Take user input
password = input("Enter your password: ")

result = check_password_strength(password)
print("Password Strength:", result)
