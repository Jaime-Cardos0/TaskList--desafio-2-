import {taskStyle, divLayoutStyle, closeButtonStyle, taskCheckStyle} from "./styles";

let addTaskButton = document.getElementById("addTaskButton");
let newTaskInput = document.getElementById("newTask");
let taskList = document.getElementById("taskList");

addTaskButton?.addEventListener("click", () => {
    const taskText = newTaskInput.value.trim();
    if (taskText) {

        let label = document.createElement('label');
        label.htmlFor = "task2";
        label.textContent = taskText;

        let taskCheck = document.createElement('input');
        taskCheck.type = "checkbox";
        Object.assign(taskCheck.style, taskCheckStyle);
        taskCheck.setAttribute("name", "task2");
        taskCheck.setAttribute("id", "task2");
        taskCheck.style.accentColor = "gray";

        let divLayout = document.createElement('div');
        Object.assign(divLayout.style, divLayoutStyle);
        divLayout.appendChild(taskCheck);
        divLayout.appendChild(label);

        let closeButton = document.createElement("button");
        Object.assign(closeButton.style, closeButtonStyle);
        closeButton.type = "button";
        closeButton.textContent = "x";

        let task = document.createElement('div');
        Object.assign(task.style, taskStyle);
        task.classList.add("task");


        // const listItem = document.createElement("li");
        // listItem.textContent = taskText;
        taskList?.appendChild(divLayout);
        taskList?.appendChild(closeButton);
        // newTaskInput.value = "";
    }
});