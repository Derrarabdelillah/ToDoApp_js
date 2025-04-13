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


let arrayOfTasks = [];

// check if there is data in local Storage to Show it
if( localStorage.getItem("tasks") ) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

// Trigger Get Data from local Storage Function
getData();

addTsk.onclick = function() {

    if( userTxt.value !== "" ) {
        addTasksToArray(userTxt.value); // save the task to the array
        userTxt.value = ""; // clear the input field
    };

};


// Click on Task Element
tasksDiv.addEventListener("click", (e) => {
    // Delete Button
    if( e.target.classList.contains("delete") ) {
        delItm(e.target.parentElement.getAttribute("data-id"));
        e.target.parentElement.remove();
    }
})

function addTasksToArray(taskTxt) {

    // Task Data
    const task = {
        id: Date.now(),
        title: taskTxt,
        completed: false,
    };

    // push the task data to the array
    arrayOfTasks.push(task);
    addElementsToPageFrom(arrayOfTasks);

    // Add Data Array to Local Storage
    savetoLocal(arrayOfTasks);

};

// create a function to add elements to page from array of tasks
function addElementsToPageFrom(arrayOfTasks) {

    // Empty the Div inner HTML
    tasksDiv.innerHTML = "";

    // Loop Through the array of tasks
    arrayOfTasks.forEach( (task) => {

        // Create New Div Element
        let div = document.createElement("div");
        div.className = "list";

        if( task.completed ){
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
        span.appendChild(document.createTextNode("Delete"));

        // Add the delete button to the parent div
        div.appendChild(span);
        // Add the div element to the divTask
        tasksDiv.appendChild(div);
    } )
};

function savetoLocal(arrayOfTasks) {
    localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
};

function getData() {
    let data = localStorage.getItem("tasks");
    if( data ) {
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks);
    }
}

function delItm(taskId) {
    arrayOfTasks = arrayOfTasks.filter( (t) =>t.id != taskId );
    savetoLocal(arrayOfTasks);
}