import { taskStyle, divLayoutStyle, deleteButtonStyle, taskCheckStyle } from "./styles.js";

let addTaskButton = document.getElementById("addTaskButton");
let newTaskInput = document.getElementById("newTask");
let taskList = document.getElementById("taskList");
let clearCompletedButton = document.getElementById("clearCompleted");
let taskCountSpan = document.getElementById("taskCount");

const STORAGE_KEY = "taskList_key";

let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        createTaskElement(task.text, task.completed, index);
    });
    updateTaskCount();
}

function createTaskElement(text, completed = false, index) {
    let task = document.createElement("div");
    task.classList.add("task");
    if (completed) task.classList.add("completed");
    Object.assign(task.style, taskStyle);

    let divLayout = document.createElement("div");
    Object.assign(divLayout.style, divLayoutStyle);

    let taskCheck = document.createElement("input");
    taskCheck.type = "checkbox";
    Object.assign(taskCheck.style, taskCheckStyle);
    taskCheck.checked = completed;

    let label = document.createElement("label");
    label.htmlFor = `task-${index}`;
    label.textContent = text;

    divLayout.appendChild(taskCheck);
    divLayout.appendChild(label);

    let deleteButton = document.createElement("button");
    Object.assign(deleteButton.style, deleteButtonStyle);
    deleteButton.type = "button";
    deleteButton.textContent = "x";

    task.appendChild(divLayout);
    task.appendChild(deleteButton);
    taskList.appendChild(task);

    taskCheck.addEventListener("change", () => {
        tasks[index].completed = taskCheck.checked;
        if (taskCheck.checked) {
            task.classList.add("completed");
        } else {
            task.classList.remove("completed");
        }
        saveTasks();
        updateTaskCount();
    });

    deleteButton.addEventListener("click", () => {
        tasks = tasks.filter(t => t.index !== tasks[index].
        //tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    });
}

function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function updateTaskCount() {
    const activeCount = tasks.filter(t => !t.completed).length;
    taskCountSpan.textContent = `${activeCount} tarefa${activeCount !== 1 ? "s" : ""}`;
}

addTaskButton?.addEventListener("click", addTask);
newTaskInput?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
});

function addTask() {
    const taskText = newTaskInput.value.trim();
    if (taskText) {
        tasks = [...tasks, { text: taskText, completed: false }]
        //tasks.push({ text: taskText, completed: false });
        saveTasks();
        createTaskElement(taskText, false, tasks.length - 1);
        newTaskInput.value = "";
        updateTaskCount();
    }
}

clearCompletedButton?.addEventListener("click", () => {
    tasks = tasks.filter(t => !t.completed);
    saveTasks();
    renderTasks();
});

renderTasks();
