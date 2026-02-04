password = input("Enter Password: ")

length_ok = len(password) >= 8
has_number = any(char.isdigit() for char in password)
has_upper = any(char.isupper() for char in password)

score = length_ok + has_number + has_upper

if score == 3:
    print("Strong 💪")
elif score == 2:
    print("Medium 🙂")
else:
    print("Weak ⚠️")
