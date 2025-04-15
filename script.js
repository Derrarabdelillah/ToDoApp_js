let userTxt = document.querySelector(".input");
let addTsk = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

// Add Task ( onclick event )
// --- Check if the userTxt not empty
// --- Create function to set the tasks data to the array
// --- Add task to array of the tasks
// --- clear the input field
// Crate a function that will display the tasks in the tasksDiv
// --- Loop through the tasks array and create a new element for each task
// --- Add the task element to the tasksDiv


let dataTsk = [];

// check if there is data in local Storage to Show it
if (localStorage.getItem("tasks")) {
    dataTsk = JSON.parse(localStorage.getItem("tasks"));
}

// Trigger Get Data from local Storage Function
getData();

addTsk.onclick = function () {

    if (userTxt.value !== "") {
        addTasksToArray(userTxt.value); // save the task to the array
        userTxt.value = ""; // clear the input field
    };

};


// Click on Task Element
tasksDiv.addEventListener("click", (e) => {
    // Delete Button
    if (e.target.classList.contains("delete")) {
        delItm(e.target.parentElement.getAttribute("data-id"));
        // remove task from page
        e.target.parentElement.remove();
    }

    if (e.target.classList.contains("list")) {
        // Toggle Completed for the task
        changcomp(e.target.getAttribute("data-id"));
        // toggle done class in the element clicked
        e.target.classList.toggle("done");
    }
})

// this function add the user task to object and push the object to 
// the array
function addTasksToArray(taskTxt) {

    // Task Data
    const task = {
        id: Date.now(),
        title: taskTxt,
        completed: false,
    };

    // push the task data to the array
    dataTsk.push(task);
    addElementsToPageFrom(dataTsk);

    // Add Data Array to Local Storage
    savetoLocal(dataTsk);

};

// create a function to add elements to page from array of tasks
function addElementsToPageFrom(dataTsk) {

    // Empty the Div inner HTML
    tasksDiv.innerHTML = "";

    // Loop Through the array of tasks
    dataTsk.forEach((task) => {

        // Create New Div Element
        let div = document.createElement("div");
        div.className = "list";

        if (task.completed) {
            div.className = "list done";
        }

        div.setAttribute("data-id", task.id);

        // Create New H3 element her value is the user task
        let heading = document.createElement("h3");
        let headingTxt = document.createTextNode(task.title);
        heading.appendChild(headingTxt);

        // add the h3 and user task to the div
        div.appendChild(heading);

        // Create Delete Button
        let span = document.createElement("button");
        span.className = "delete";
        // Delete Icon
        let delIcon = document.createElement("i");
        delIcon.classList = "fa-solid fa-x del";
        span.appendChild(delIcon);

        // Add the delete button to the parent div
        div.appendChild(span);

        // Add the div element to the divTask
        tasksDiv.appendChild(div);
    })
};

// function to add data from array to local Storage
function savetoLocal(dataTsk) {
    localStorage.setItem("tasks", JSON.stringify(dataTsk));
};

// function to get data from local Storage
function getData() {
    let data = localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks);
    }
}

// this function delete the task target from array Of Tasks. 
// with the method of filter and save new array Task data to local Storage.
function delItm(taskId) {
    dataTsk = dataTsk.filter((t) => t.id != taskId);
    savetoLocal(dataTsk);
}


function changcomp(taskId) {

    for (let i = 0; i < dataTsk.length; i++) {
        if (dataTsk[i].id == taskId) {
            dataTsk[i].completed == false ? (dataTsk[i].completed = true) : (dataTsk[i].completed = false);
        }
    }
    savetoLocal(dataTsk);
}