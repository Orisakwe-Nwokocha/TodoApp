const taskList = document.querySelector("#task-list ul");

function getTasksFromStorage() {
    const storedTasks = localStorage.getItem("taskList");
    return storedTasks ? JSON.parse(storedTasks) : []; // Return empty array if no tasks
}

function saveTasksToStorage(tasks) {
    localStorage.setItem("taskList", JSON.stringify(tasks));
}

const tasks = getTasksFromStorage();

tasks.forEach((task) => {
    const liTag = document.createElement("li");
    const firstSpan = document.createElement("span");
    const secondSpan = document.createElement("span");
    const thirdSpan = document.createElement('input');

    firstSpan.className = 'name';
    secondSpan.classList = 'delete';
    thirdSpan.type = 'checkbox';

    if (task.completed) {
        thirdSpan.checked = true;
    }

    liTag.appendChild(firstSpan);
    liTag.appendChild(secondSpan);
    liTag.appendChild(thirdSpan);

    firstSpan.textContent = task.text; // Use task.text from storage
    secondSpan.textContent = "delete";
    thirdSpan.textContent = 'check';

    taskList.appendChild(liTag);
});

taskList.addEventListener("click", (event) => {
    let className = event.target.className;
    if (className === "delete") {
        let li = event.target.parentElement;
        taskList.removeChild(li);

        const taskText = li.querySelector(".name").textContent;
        const updatedTasks = tasks.filter((task) => task.text !== taskText);
        saveTasksToStorage(updatedTasks);
    } else if (event.target.type === 'checkbox') {
        const li = event.target.parentElement;
        const taskText = li.querySelector(".name").textContent;

        tasks.forEach((task) => {
            if (task.text === taskText) {
                task.completed = event.target.checked;
            }
        });
        saveTasksToStorage(tasks);
    }
});

const searchBook = document.forms["search-books"];

const listOfTask = document.querySelectorAll("#book-list li .name");
searchBook.addEventListener("keyup", function (event) {
    let inputText = event.target.value.toLowerCase();

    listOfTask.forEach((book) => {
        let title = book.textContent.toLocaleLowerCase();
        let isIncludeInputText = title.includes(inputText);

        let parentNode = book.parentNode;

        if (isIncludeInputText) {
            parentNode.style.display = "block";
        } else {
            parentNode.style.display = "none";
        }
    });
});

const addTask = document.forms["add-book"];

addTask.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = addTask.querySelector("input").value.trim();
    if (inputValue) {
        const liTag = document.createElement("li");
        const firstSpan = document.createElement("span");
        const secondSpan = document.createElement("span");
        const thirdSpan = document.createElement('input');

        firstSpan.className = 'name';
        secondSpan.classList = 'delete';
        thirdSpan.type = 'checkbox';

        liTag.appendChild(firstSpan);
        liTag.appendChild(secondSpan);
        liTag.appendChild(thirdSpan);

        firstSpan.textContent = inputValue;
        secondSpan.textContent = "delete";
        thirdSpan.textContent = 'check';

        taskList.appendChild(liTag);

        tasks.push({ text: inputValue, completed: false });
        saveTasksToStorage(tasks);

        addTask.reset();
    }
});