const form = document.getElementById("addForm");
const taskList = document.getElementById("tasks");
const deleteModal = document.getElementById("confirmModal");
const deleteModalBtn = document.getElementById("confirm-delete-button");
const addTaskBtn = document.getElementById("addTask");
const deleteAllBtn = document.getElementById("deleteAll");
const filter = document.getElementById("filter");

//* Get Tasks from LocalStorage if any
document.addEventListener("DOMContentLoaded", getTasks);

//* Add Task Button Event
addTaskBtn.addEventListener("click", addTask);

//* Filter Event
filter.addEventListener("keyup", filterTasks);

//* Delete All Tasks
deleteAllBtn.addEventListener("click", deleteAllTasks);

//* Delete Button Event
$("#confirmModal").on("show.bs.modal", function (event) {
   //* By using modal event listener
   //* Get task-id of the button that triggered the event
   var btn = event.relatedTarget;
   task = btn.parentElement;
   // console.log(task);
});
deleteModalBtn.addEventListener("click", function (e) {
   // console.log(task);
   taskList.removeChild(task);
   deleteFromLocalStorage(task);
});

//* Delete Task from local storage
function deleteFromLocalStorage(taskElem) {
   let tasks;
   if (localStorage.getItem("tasks") === null) {
      tasks = [];
   } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
   }

   tasks.forEach((task, idx) => {
      if (taskElem.textContent === task) {
         tasks.splice(idx, 1);
      }
   });

   localStorage.setItem("tasks", JSON.stringify(tasks));
}

// taskList.addEventListener('click', deleteTask)
//* Delete Task
// function deleteTask(e) {
// if(e.target.classList.contains('delete')){
// }     //*For deleting using tasklist click event listener(incomplete)
// }

//* Delete All Tasks
function deleteAllTasks(e) {
   while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
   }

   // Clear localStorage
   deleteAllFromLocalStorage();
   e.preventDefault();
}

//* Delete All tasks from localStorage
function deleteAllFromLocalStorage() {
   localStorage.clear();
}

//* GetTasks from LocalStorage
function getTasks() {
   let tasks;
   if (localStorage.getItem("tasks") === null) {
      tasks = [];
   } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
   }

   tasks.forEach((task) => {
      //* Create a Element(li) for the new task
      let li = document.createElement("li");
      li.className = "list-group-item";
      //* Add to li elem, a text node with input value of new task
      let liText = document.createTextNode(task);
      li.appendChild(liText);
      // console.log(li)
      // li.setAttribute("id", taskList.getElementsByTagName("li").length + 1);
      //* Create delete button
      let deleteBtn = document.createElement("button");
      //* Add classes to delete button
      deleteBtn.className = "btn btn-danger btn-sm float-right delete";

      //* Add modal attributes
      deleteBtn.dataset.toggle = "modal";
      deleteBtn.dataset.target = "#confirmModal";

      //* Add icon to delete button
      deleteBtn.innerHTML = `<i class="fas fa-trash"></i>`;
      //* Append button to li elem
      li.appendChild(deleteBtn);
      // console.log(li);
      //* Append the task(li) element to the task list
      taskList.appendChild(li);
   });
}

//* Filter Tasks
function filterTasks(e) {
   //convert to lowercase
   let text = e.target.value.toLowerCase();
   let tasks = taskList.getElementsByTagName("li");
   Array.from(tasks).forEach((task) => {
      let taskName = task.firstChild.textContent;
      // console.log(taskName)
      if (taskName.toLowerCase().indexOf(text) != -1) {
         task.style.display = "block";
      } else {
         task.style.display = "none";
      }
   });
}

//* Add Task
function addTask(e) {
   var input = document.getElementById("newTask").value;
   if (input === "") {
      alert("Add A Task");
   }

   //* Get input value
   let newTask = input;
   // console.log(newTask)
   //* Create a Element(li) for the new task
   let li = document.createElement("li");
   li.className = "list-group-item";
   //* Add to li elem, a text node with input value of new task
   let liText = document.createTextNode(newTask);
   li.appendChild(liText);
   // console.log(li)
   // li.setAttribute("id", taskList.getElementsByTagName("li").length + 1);
   //* Create delete button
   let deleteBtn = document.createElement("button");
   //* Add classes to delete button
   deleteBtn.className = "btn btn-danger btn-sm float-right delete";

   //* Add modal attributes
   deleteBtn.dataset.toggle = "modal";
   deleteBtn.dataset.target = "#confirmModal";

   //* Add icon to delete button
   deleteBtn.innerHTML = `<i class="fas fa-trash"></i>`;
   //* Append button to li elem
   li.appendChild(deleteBtn);
   // console.log(li);
   //* Append the task(li) element to the task list
   taskList.appendChild(li);

   //* Store in Local Storage
   storeInLocalStorage(input);

   document.getElementById("newTask").value = "";
   e.preventDefault();
}

//* Store Task to LocalStorage
function storeInLocalStorage(task) {
   let tasks;

   if (localStorage.getItem("tasks") === null) {
      tasks = [];
   } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
   }

   tasks.push(task);
   localStorage.setItem("tasks", JSON.stringify(tasks));
}
