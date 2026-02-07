from pathlib import Path

# Define folder path
folder_path = Path("Python/Practice/file/hello")

# Create folder
folder_path.mkdir(parents=True, exist_ok=True)

print("Folder created successfully!")

# Define file path
file_path = folder_path / "greeting.txt"    

file_path.touch()  # creates empty file

# Write to file
with file_path.open("w") as f:
    f.write("Hello, World! test 2")

print("File created and written successfully!")