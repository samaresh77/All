import pandas as pd

# Create dataframe
data = {
    "Name": ["Samaresh", "Rahul", "Amit"],
    "Age": [25, 22, 28]
}

df = pd.DataFrame(data)
# print(df)
# print(df["Name"])
# print(df["Age"].mean())

# Filtering data
# print(df[df["Age"] > 24])
# print("length->", len(df))

# Ex.
# Q1. Create DataFrame and print it.
data = {
    "Name": ["Samaresh", "Rahul", "Amit", "Priya"],
    "Age": [25, 22, 28, 30]
}
df = pd.DataFrame(data)
# print(df)

# Q2.Print only people whose age is greater than 25.
print(df[df["Age"] > 25]["Name"])

# Q2.Print only people whose age is less than 25.
print(df[df["Age"] < 25]["Name"])

# Q4.How many rows exist in the DataFrame?
print("Length of df ->",len(df))

# Q5. min, max, mean(avg) age?
print("Avg age ->",df["Age"].mean())
print("Min age ->",df["Age"].min())
print("Max age ->",df["Age"].max())