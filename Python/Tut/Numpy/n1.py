import numpy as np

# Creating Array
arr = np.array([1, 2, 3, 4, 5]) #1D Array
print(arr)
print(arr.shape)

#2D Array
arr2 = np.array([[1, 2, 3],[4, 5, 6]])
print(arr2)
print(arr2.shape)

#3D Array
arr3 = np.array([
    [[1,2],[3,4]],
    [[5,6],[7,8]]
])
print(arr3)
print(arr3.shape)