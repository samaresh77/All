# write file
with open("./example2.txt", "w") as file:
    file.write("Hello, World!\n")
    file.write("This is a sample file.\n")
    print("File written successfully.")

# read file
with open("example.txt", "r") as file:
    content = file.read()
    print(content)

# # without using 'with' statement
# file = open("example.txt", "r")
# content = file.read()
# print(content)
# file.close()

# append to file
with open("example.txt", "a") as file:
    file.write("Appending a new line.\n")

# read file again to see the changes
with open("example.txt", "r") as file:
    content = file.read()
    print(content)

# read file line by line
with open("example.txt", "r") as file:
    for line in file:
        print(line.strip())

# using with statement to ensure file is closed properly
with open("example.txt", "r") as file:
    content = file.readlines()
    print(content)

# check if file exists
import os
if os.path.exists("example.txt"):
    print("File exists.")
else:
    print("File does not exist.")

# # delete file
# os.remove("ex2.txt")
# print("File deleted.")


