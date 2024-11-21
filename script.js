import { createTask, generateTaskId, saveTodoList, getTodoList } from "./repository.js";

const form = document.querySelector("#form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  addNewTask();
});

function validateInput(input) {
  if (!input.value.trim()) {
    alert('Digite algum texto!')
    return false
  }
  return true
}

function addNewTask() {
  const input = document.querySelector("#input-new-task");

  if (!validateInput(input)) return

  const tasks = getTodoList();
  const newTask = createTask(generateTaskId(), input.value.trim());
  tasks.push(newTask);
  saveTodoList(tasks);
  
  input.value = "";
  showTodoList();
}

function createListItem(task) {
  const listItem = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;

  checkbox.addEventListener("click", () => {
    toggleCheckbox(task);
  });

  const taskText = document.createElement("span");
  taskText.textContent = task?.task;
  const editBtn = document.createElement("i");
  editBtn.classList.add("fas", "fa-edit", "btn-edit-task");

  editBtn.addEventListener("click", () => {
    editTask(task);
  });

  const deleteBtn = document.createElement("i");
  deleteBtn.classList.add("fas", "fa-trash", "btn-delete-task");
  deleteBtn.addEventListener("click", () => {
    removeTask(task);
  });

  listItem.appendChild(checkbox);
  listItem.appendChild(taskText);
  listItem.appendChild(editBtn);
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

function editTask(task) {
  const inputEditTask = document.getElementById("input-edit-task");
  const modal = document.querySelector("dialog");

  modal.setAttribute("data-id", task.id);

  inputEditTask.value = task.task;
  
  modal.showModal();
}

document.getElementById("btn-edit").addEventListener("click", () => {
  const inputEditTask = document.getElementById("input-edit-task");
  const modal = document.querySelector("dialog");
  const taskId = modal.getAttribute("data-id");

  const tasks = getTodoList();

  const taskIndex = tasks.findIndex((t) => t.id === Number(taskId));

  if (taskIndex !== -1) {
    tasks[taskIndex].task = inputEditTask.value.trim();
    saveTodoList(tasks);
    showTodoList();
  }

  closeModal();
  modal.removeAttribute("data-id");
});

document.getElementById("btn-cancel-edit").addEventListener("click", () => {
  const modal = document.querySelector("dialog");

  closeModal();
  modal.removeAttribute("data-id");
});

function closeModal() {
  const modal = document.querySelector("dialog");
  modal.close();
}

function removeTask(task) {
  const tasks = getTodoList();
  const taskIndex = tasks.findIndex((t) => t?.id === task?.id);

  if (taskIndex !== -1) tasks.splice(taskIndex, 1);

  saveTodoList(tasks);
  showTodoList();
}

function toggleCheckbox(task) {
  const tasks = getTodoList();
  const taskIndex = tasks.findIndex((t) => t?.id === task?.id);

  if (taskIndex !== -1) {
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    saveTodoList(tasks);
  }
  showTodoList();
}

showTodoList();
