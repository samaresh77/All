sentence = input("Enter sentence: ")

# 1️⃣ Word count
words = sentence.split()
print("Words:", len(words))

# 2️⃣ Character count (excluding spaces)
chars = sentence.replace(" ", "")
print("Characters (no spaces):", len(chars))

# 3️⃣ Most common letter
letter_count = {}

for ch in sentence.lower():
    if ch.isalpha():  # only count letters
        letter_count[ch] = letter_count.get(ch, 0) + 1

most_common = max(letter_count, key=letter_count.get)
print("Most common letter:", most_common)
