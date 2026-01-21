# find the thief in a room
def find_thief(room):    
    for person in room:
        if person.get('is_thief', False):
            return person
    return None

# Example usage
if __name__ == "__main__":
    room = [
        {'name': 'Alice', 'is_thief': False},
        {'name': 'Bob', 'is_thief': True},
        {'name': 'Charlie', 'is_thief': False}
    ]
    
    thief = find_thief(room)
    if thief:
        print(f"The thief is: {thief['name']}")
    else:
        print("No thief found in the room.")

