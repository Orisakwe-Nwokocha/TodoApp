const taskList = document.querySelector("#task-list ul");
console.log(taskList);

taskList.addEventListener("click", (event) => {
    console.log(event);
    let classname = event.target.className;
    console.log(classname);

    if(Object.is(classname, "delete")){
        let li= event.target.parentElement;
        taskList.removeChild(li);
    }
})

const searchTask = document.forms["search-tasks"]
const tasks= document.querySelectorAll("#task-list li .name")

searchTask.addEventListener("keyup", (event) => {
    let inputText = event.target.value.toLowerCase()
    tasks.forEach((task) => {
        let title = task.textContent.toLowerCase();
        let isInclude = title.includes(inputText);
        let parentNode = task.parentNode;

        console.log(parentNode);
        parentNode.style.display = isInclude ? "block" : "none";
    })

})

const addTask = document.forms["add-task"]
addTask.addEventListener("submit",  (event) => {
    event.preventDefault()

    const inputValue = addTask.querySelector("input").value.toString().trim();
    if(inputValue && !/\s/.test(inputValue[0])) {
        const liTag = document.createElement("li");
        const span1Tag = document.createElement("span");
        const span2Tag = document.createElement("span");
        const inputTag = document.createElement("input");
        const labelTag = document.createElement("label");

        inputTag.classList.add("checkboxes")
        inputTag.type = "checkbox";
        span1Tag.classList.add("name");
        span2Tag.classList.add("delete");
        span1Tag.textContent = " " + inputValue;
        span2Tag.textContent = "delete";

        labelTag.appendChild(inputTag);

        liTag.appendChild(labelTag)
        liTag.appendChild(span1Tag);
        liTag.appendChild(span2Tag);

        taskList.appendChild(liTag);

        addTask.reset();
    }
});