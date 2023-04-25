document.addEventListener("DOMContentLoaded", () => {
  addingEventListener();
});

let taskObjArr = [];

function addingEventListener() {
  document
    .getElementById("create-task-form")
    .addEventListener("submit", handleFormSubmit);
  document
    .getElementById("sort-tasks")
    .addEventListener("change", sortTasks);
}

function handleFormSubmit(e) {
  e.preventDefault();
  const task = e.target[0].value;
  const priorityLvl = parseInt(e.target.priority.value);
  const duration = parseInt(e.target.duration.value); // Get duration value from input field

  const taskObj = { task, priorityLvl, duration }; // Include duration and priorityLvl in task object
  taskObjArr.push(taskObj);

  sortTasks();
  displayTasks();
}

// add list items
function displayTasks() {
  const taskUl = document.getElementById("tasks");
  taskUl.innerHTML = "";

  taskObjArr.forEach((task, index) => {
    const taskLi = document.createElement("li");
    const deleteBtn = document.createElement("button");
    const editBtn = document.createElement("button");

    deleteBtn.textContent = "x";
    deleteBtn.addEventListener("click", (e) => deleteTask(e, index));

    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", (e) => editTask(e, index));

    taskLi.textContent = task.task + " (Duration: " + task.duration + " mins) "; // Include duration in list item
    taskLi.style.color = getPriorityColor(task.priorityLvl);
    taskLi.appendChild(deleteBtn);
    taskLi.appendChild(editBtn);
    taskUl.appendChild(taskLi);
  });
}

// delete list items
function deleteTask(e, index) {
  taskObjArr.splice(index, 1);
  e.target.parentNode.remove();
}

// edit list items
function editTask(e, index) {
  const taskLi = e.target.parentNode;
  const taskText = taskLi.firstChild.textContent;
  const taskInput = document.createElement("input");
  const saveBtn = document.createElement("button");

  taskInput.value = taskText.trim();
  saveBtn.textContent = "Save";
  saveBtn.addEventListener("click", (e) => saveTask(e, index));

  taskLi.innerHTML = "";
  taskLi.appendChild(taskInput);
  taskLi.appendChild(saveBtn);
}

// save edited task
function saveTask(e, index) {
  const taskLi = e.target.parentNode;
  const taskInput = taskLi.querySelector("input[type='text']");
  const newTaskText = taskInput.value;
  
  const durationInput = taskLi.querySelector("input[type='text'][data-type='duration']");
  const newDuration = durationInput ? parseInt(durationInput.value) : null;
  
  const priorityLvlInput = taskLi.querySelector("input[type='radio']:checked");
  const newPriorityLvl = priorityLvlInput ? parseInt(priorityLvlInput.value) : null;
  
  taskObjArr[index].task = newTaskText;
  if (newDuration !== null) {
    taskObjArr[index].duration = newDuration;
  }
  if (newPriorityLvl !== null) {
    taskObjArr[index].priorityLvl = newPriorityLvl;
  }
  displayTasks();
}

// Color Coding Priority Lvl
function getPriorityColor(priorityLvl) {
  if (priorityLvl === 1) {
    return "red";
  } else if (priorityLvl === 2) {
    return "blue";
  } else {
    return "green";
  }
}

function sortTasks() {
  const sortTasksSelect = document.getElementById("sort-tasks");
  if (sortTasksSelect.value === "h-l") {
    taskObjArr.sort((a, b) => a.priorityLvl - b.priorityLvl);
  } else {
    taskObjArr.sort((a, b) => b.priorityLvl - a.priorityLvl);
  }
  displayTasks();
}