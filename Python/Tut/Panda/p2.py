import pandas as pd

# Reading csv file
df = pd.read_csv("/Users/samaresh/Personal/All/Python/Tut/Panda/Students.csv")
# print(df) # Read CSV
# print(df.head()) # View First 5 Rows
# print(df.tail()) # View Last 5 Rows
# print(df.info()) # Get Information About the Dataset
print(df.describe()) # Get Statistical Summary