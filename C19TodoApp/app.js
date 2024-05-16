const taskList = document.querySelector("#task-list ul");

document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
});

function loadTasks() {
    // localStorage.clear()
    // localStorage.setItem("isSaved", null);

    let isSaved = localStorage.getItem("isSaved");
    if (isSaved === null) isSaved = false;
    else isSaved = isSaved === "true";

    const nodes = Array.from(document.querySelectorAll("#task-list li .name"));

    if (isSaved === false) {
        nodes.forEach(node => {
            const newTask = {name: node.innerText, parentElement: node.parentElement};
            node.parentElement.remove();
            save(newTask);
        });

        isSaved = "true";
        localStorage.setItem("isSaved", isSaved);
    }

    if (nodes.length > 0) {
        nodes.forEach(node => {
            node.parentElement.style.display = "none";
            node.parentElement.remove();
        });
    }

    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) savedTasks.forEach(task => render(task));
}


function render(task) {
    const liTag = document.createElement("li");
    const labelTag = document.createElement("label");
    const inputTag = document.createElement("input");
    const span1Tag = document.createElement("span");
    const span2Tag = document.createElement("span");

    inputTag.classList.add("checkboxes");
    inputTag.type = "checkbox";
    labelTag.appendChild(inputTag);

    span1Tag.classList.add("name");
    span2Tag.classList.add("delete");
    span1Tag.textContent = " " + task.name;
    span2Tag.textContent = "delete";

    liTag.appendChild(labelTag);
    liTag.appendChild(span1Tag);
    liTag.appendChild(span2Tag);

    taskList.appendChild(liTag);
}


function save(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function removeTaskFromStorage(taskName) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.name !== taskName);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function addNewTask(taskName) {
    const liTag = document.createElement("li");
    const newTask = {name: taskName, parentElement: liTag};
    render(newTask);
    save(newTask);
}


const addTask = document.forms["add-task"];
addTask.addEventListener("submit", event => {
    event.preventDefault();
    const inputValue = addTask.querySelector("input").value.toString().trim();

    let isValid = inputValue && !/\s/.test(inputValue[0]);
    if (isValid) addNewTask(inputValue);

    addTask.reset();
});


taskList.addEventListener("click", event => {
    if (event.target.classList.contains("delete")) {
        const li = event.target.parentElement;
        const taskName = li.querySelector(".name").textContent.trim();
        removeTaskFromStorage(taskName);
        li.remove();
    }
});


const searchTask = document.forms["search-tasks"];
const tasks = JSON.parse(localStorage.getItem("tasks"));

searchTask.addEventListener("keyup", event => {
    const inputText = event.target.value.toLowerCase();
    const matchingTasks = tasks.filter(task => task.name.toLowerCase().includes(inputText));

    taskList.innerHTML = "";
    matchingTasks.forEach(task => render(task));
});
