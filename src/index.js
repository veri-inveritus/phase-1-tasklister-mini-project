document.addEventListener("DOMContentLoaded", () => {
  addingEventListener();
})

function addingEventListener() {
  document
    .getElementById("create-task-form")
    .addEventListener("submit", handleFormSubmit);
}

function handleFormSubmit(e) {
  e.preventDefault();
  const task = e.target[0].value;
  const priorityLvl = parseInt(e.target.priority.value);
  displayTask(task, priorityLvl);
}

//add list items
function displayTask(task, priorityLvl) {
  const taskUl = document.getElementById("tasks");
  const taskLi = document.createElement("li");
  const deleteBtn = document.createElement("button");

  deleteBtn.textContent = "x";
  deleteBtn.addEventListener("click", deleteTask);

  taskLi.textContent = task + " ";
  taskLi.style.color = getPriorityColor(priorityLvl);
  taskLi.appendChild(deleteBtn); 
  taskUl.appendChild(taskLi);
}

//delete list items
function deleteTask(e) {
  e.target.parentNode.remove();
}

//Color Coding Priority Lvl
function getPriorityColor(priorityLvl) {
  switch (priorityLvl) {
    case 1:
      return "red";
    case 2:
      return "blue";
    default:
      return "green";
  }
}