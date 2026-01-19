from flask import Flask, render_template, request
import random
import string

app = Flask(__name__)

# -----------------------
# Password Generator
# -----------------------
def generate_password(length):
    chars = string.ascii_letters + string.digits + string.punctuation
    return ''.join(random.choice(chars) for _ in range(length))

# -----------------------
# Strength Checker
# -----------------------
def check_strength(password):
    score = 0

    if len(password) >= 8:
        score += 1
    if any(c.isupper() for c in password):
        score += 1
    if any(c.islower() for c in password):
        score += 1
    if any(c.isdigit() for c in password):
        score += 1
    if any(not c.isalnum() for c in password):
        score += 1

    if score <= 2:
        return "Weak ❌"
    elif score <= 4:
        return "Medium ⚠️"
    else:
        return "Strong ✅"

# -----------------------
# Routes
# -----------------------
@app.route("/", methods=["GET", "POST"])
def index():
    password = ""
    strength = ""

    if request.method == "POST":
        length = int(request.form["length"])
        password = generate_password(length)
        strength = check_strength(password)

    return render_template(
        "index.html",
        password=password,
        strength=strength
    )

if __name__ == "__main__":
    app.run(debug=True)
