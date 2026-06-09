import numpy as np

# Creating Array
arr = np.array([1, 2, 3, 4, 5]) #1D Array
print(arr)
print("shape of 1d array->",arr.shape)
print(f"dimention of array-> {arr.ndim}")
print(f"size of 1d array-> {arr.size}")

#2D Array
arr2 = np.array([[1, 2, 3],[4, 5, 6]])
print(arr2)
print("shape of 2d array->",arr2.shape)
print(f"dimention of array-> {arr2.ndim}")
print(f"size of 2d array-> {arr2.size}")

#3D Array
arr3 = np.array([
    [[1,2],[3,4]],
    [[5,6],[7,8]]
])
print(arr3)
print("shape of 3d array->",arr3.shape)
print(f"dimention of array-> {arr3.ndim}")
print(f"size of 3d array-> {arr3.size}")