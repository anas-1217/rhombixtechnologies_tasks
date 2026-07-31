function saveTasks(){

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const input = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const list = document.getElementById("taskList");



function displayTasks() {

    list.innerHTML = "";
    tasks.forEach((task, index) =>{
        let li = document.createElement("li");
        li.textContent = task;
        list.appendChild(li);
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.id = "deleteButton";
        deleteButton.addEventListener("click", function() {
            tasks.splice(index, 1);
            displayTasks();
            saveTasks();
        });
        li.appendChild(deleteButton);
        let editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.id = "editButton";
        editButton.addEventListener("click", function() {
            let newTask = prompt("Edit task", tasks[index]);

            if (newTask !== null && newTask.trim() !== "") {
                tasks[index] = newTask.trim();
                displayTasks();
                saveTasks();
            }
        });
        li.appendChild(editButton);
    });

}

addButton.addEventListener("click", function()
{
    const task = input.value.trim();
    if (task == "") {
        alert("Please enter a task.");
        return;
    }
    tasks.push(task);
    input.value = "";
    displayTasks();
    saveTasks();
});