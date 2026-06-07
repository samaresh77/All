const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    // Create List Item
    const li = document.createElement("li");

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    // Task Text
    const span = document.createElement("span");
    span.textContent = taskText;

    // Edit Button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";

    // Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    // Complete Task
    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            span.style.textDecoration = "line-through";
        } else {
            span.style.textDecoration = "none";
        }
    });

    // Edit Task
    editBtn.addEventListener("click", () => {
        const newTask = prompt("Edit Task", span.textContent);

        if (newTask !== null && newTask.trim() !== "") {
            span.textContent = newTask.trim();
        }
    });

    // Delete Task
    deleteBtn.addEventListener("click", () => {
        li.remove();
    });

    // Append Elements
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);

    // Clear Input
    taskInput.value = "";
    taskInput.focus();
}