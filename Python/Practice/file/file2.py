from pathlib import Path

folder = Path("MyData")
folder.mkdir(exist_ok=True)

file = folder / "data.txt"

# CREATE
file.touch(exist_ok=True)

# UPDATE
with open(file, "a") as f:
    f.write("New Data Added\n")

# READ
with open(file, "r") as f:
    print(f.read())

# DELETE
# file.unlink()
