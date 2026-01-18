# Password Generator
import random
import string

def generate_password(length=12):
    """Generate a random password containing letters, digits, and punctuation."""
    if length < 4:
        raise ValueError("Password length should be at least 4 characters.")

    all_characters = string.ascii_letters + string.digits + string.punctuation
    password = [
        random.choice(string.ascii_lowercase),
        random.choice(string.ascii_uppercase),
        random.choice(string.digits),
        random.choice(string.punctuation)
    ]

    password += random.choices(all_characters, k=length - 4)
    random.shuffle(password)

    return ''.join(password)
if __name__ == "__main__":
    print("Generated Password:", generate_password(12))

    