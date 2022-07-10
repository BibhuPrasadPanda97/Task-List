const textInput = document.querySelector('.form-control');
const itemsList = document.querySelector('.list-group');
const addTaskBtn = document.querySelector('.add-task');
const filterTask = document.querySelector('#filter');
const clearTasksBtn = document.querySelector('.clear-tasks');

// load all eventListeners
loadEventListeners();

function loadEventListeners() {
    // DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add Item
    addTaskBtn.addEventListener('click', addTaskItem);
    // Delete Item
    itemsList.addEventListener('click', deleteTaskItem);
    // clear all task items
    clearTasksBtn.addEventListener('click', clearAllTaskItems);
    // Filter tasks
    filterTask.addEventListener('keyup', filterTaskItems);
}

// Get Tasks from LS
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {
        // create li element
        var liElement = document.createElement('li');
        // add class to li element
        liElement.className = 'list-group-item';
        // add taskvalue and delete icon to the li element
        const delLink = '<span class="del-icon"><a href="#" class="delete-item"><i class="fa-solid fa-xmark"></i></i></a></span>';
        liElement.innerHTML = task + delLink;

        // append to ul element
        itemsList.appendChild(liElement);
    });

}

// Add item function
function addTaskItem(e) {
    // console.log(textInput.value);
    if (textInput.value == '') {
        alert('Please enter the task!!');
    } else {
        // create li element
        var liElement = document.createElement('li');
        // add class to li element
        liElement.className = 'list-group-item';
        // add taskvalue and delete icon to the li element
        const delLink = '<span class="del-icon"><a href="#" class="delete-item"><i class="fa-solid fa-xmark"></i></i></a></span>';
        liElement.innerHTML = textInput.value + delLink;

        // append to ul element
        itemsList.appendChild(liElement);
    }

    storeTasktoLocalStorage(textInput.value);

    textInput.value = '';
    e.preventDefault();
}

// Store task to local storage
function storeTasktoLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Delete item function
function deleteTaskItem(e) {
    if (e.target.classList.contains('fa-solid')) {
        if (confirm("Are you sure to delete?")) {
            e.target.parentElement.parentElement.parentElement.remove();
        }
    }
    removeTaskFromLocalStorage(e.target.parentElement.parentElement.parentElement);
    e.preventDefault();
}

// remove task from local storage
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if (taskItem.textContent == task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear All items function
function clearAllTaskItems() {
    document.querySelectorAll('li').forEach(function (liObj) {
        liObj.remove();
    });

    // Clear tasks from local storage
    cleatTasksFromLocalStorage();
}

// Clear tasks from local storage
function cleatTasksFromLocalStorage(){
    localStorage.clear();
}

// Filter task items
function filterTaskItems(e) {
    var text = e.target.value.toLowerCase();

    document.querySelectorAll('.list-group-item').forEach(function (taskItem) {
        var item = taskItem.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            taskItem.style.display = 'block';
        } else {
            taskItem.style.display = 'none';
        }
    });

}