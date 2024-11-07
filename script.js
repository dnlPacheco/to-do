const localStorageKey = "to-do-list";

const form = document.querySelector("#form");
let editTaskID = null;

form.addEventListener("submit", (event) => {
  event.preventDefault();

  addNewTask();
});

function getTodoList() {
  const tasks = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
  return tasks;
}

function saveTodoList(tasks) {
  localStorage.setItem(localStorageKey, JSON.stringify(tasks));
}

function addNewTask() {
  const input = document.querySelector("#input-new-task");

  if (!input.value) {
    return alert("Digite algum texto!");
  }

  const tasks = getTodoList();

    tasks.push({
      id: Date.now(),
      task: input.value.trim(),
      completed: false,
    });
  

  saveTodoList(tasks);
  input.value = "";
  showTodoList();
}

function createListItem(task) {
  const listItem = document.createElement("li");
  const taskText = document.createElement("span");
  taskText.textContent = task?.task;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("btn-delete-task");
  deleteBtn.addEventListener("click", () => {
    removeTask(task);
  });

  
  listItem.appendChild(taskText);
  listItem.appendChild(deleteBtn);

  if (task.completed) {
    taskText.classList.add("completed");
  }

  return listItem;
}

function showTodoList() {
  const tasks = getTodoList();
  const todoList = document.getElementById("to-do-list"); 
  todoList.innerHTML = "";

  tasks.forEach((task) => {
    const listItem = createListItem(task);
    todoList.appendChild(listItem);
  });
}

function removeTask(task) {
  const tasks = getTodoList();
  const taskIndex = tasks.findIndex((t) => t?.id === task?.id);

  if (taskIndex !== -1) tasks.splice(taskIndex, 1);

  saveTodoList(tasks);
  showTodoList();
}

showTodoList();
