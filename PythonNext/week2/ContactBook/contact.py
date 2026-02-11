file_path = "PythonNext/week2/ExpenseTracker/contacts.txt"
FILE_NAME = file_path


def load_contacts():
    contacts = {}
    try:
        with open(FILE_NAME, "r") as file:
            for line in file:
                parts = line.strip().split(",")
                if len(parts) == 2:
                    name, phone = parts
                    contacts[name.lower()] = phone
    except FileNotFoundError:
        pass
    return contacts


def save_contacts(contacts):
    with open(FILE_NAME, "w") as file:
        for name, phone in contacts.items():
            file.write(f"{name},{phone}\n")


def add_contact(contacts):
    name = input("Enter name: ").strip()
    key = name.lower()

    if key in contacts:
        print("❌ Contact already exists!")
        return

    phone = input("Enter phone number: ").strip()

    if not phone.isdigit() or len(phone) != 10:
        print("❌ Invalid phone number.")
        return

    contacts[key] = phone
    save_contacts(contacts)
    print("✅ Contact added successfully!")


def view_contacts(contacts):
    if not contacts:
        print("No contacts found.")
        return

    print("\n--- Contact List ---")
    for name, phone in contacts.items():
        print(f"{name.title()} : {phone}")


def search_contact(contacts):
    name = input("Enter name to search: ").strip().lower()

    if name in contacts:
        print(f"✅ Found: {name.title()} : {contacts[name]}")
    else:
        print("❌ Contact not found.")


def menu():
    contacts = load_contacts()

    while True:
        print("\n--- Contact Book ---")
        print("1. Add Contact")
        print("2. View All Contacts")
        print("3. Search Contact")
        print("4. Exit")

        choice = input("Choose (1-4): ")

        if choice == "1":
            add_contact(contacts)
        elif choice == "2":
            view_contacts(contacts)
        elif choice == "3":
            search_contact(contacts)
        elif choice == "4":
            print("Goodbye 👋")
            break
        else:
            print("Invalid choice. Try again.")


if __name__ == "__main__":
    menu()
