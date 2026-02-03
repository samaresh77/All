import tkinter as tk

tasks = []

def add_task():
    task = entry.get()
    if task:
        tasks.append(task)
        listbox.insert(tk.END, task)
        entry.delete(0, tk.END)

def remove_task():
    try:
        index = listbox.curselection()[0]
        listbox.delete(index)
        tasks.pop(index)
    except IndexError:
        pass

root = tk.Tk()
root.title("To-Do App")

entry = tk.Entry(root, width=30)
entry.pack(pady=10)

tk.Button(root, text="Add Task", command=add_task).pack()
tk.Button(root, text="Remove Task", command=remove_task).pack()

listbox = tk.Listbox(root, width=40)
listbox.pack(pady=10)

root.mainloop()
