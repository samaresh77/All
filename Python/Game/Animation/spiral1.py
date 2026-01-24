import numpy as np
import matplotlib.pyplot as plt
import colorsys

loops = 300
angle = 59

x, y = 0, 0
points_x = []
points_y = []
colors = []

direction = 0

for i in range(loops):
    hue = i / loops
    r, g, b = colorsys.hsv_to_rgb(hue, 1, 1)

    x += np.cos(np.radians(direction)) * i * 0.5
    y += np.sin(np.radians(direction)) * i * 0.5

    points_x.append(x)
    points_y.append(y)
    colors.append((r, g, b))

    direction += angle

plt.figure(figsize=(6,6), facecolor='black')
for i in range(len(points_x)-1):
    plt.plot(points_x[i:i+2], points_y[i:i+2], color=colors[i], linewidth=2)

plt.axis('off')
plt.savefig("rainbow_spiral.png", dpi=300, facecolor='black')
plt.show()
