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

  if (editTaskID) {
    const taskIndex = tasks.findIndex((t) => t.id === editTaskID);
    if (taskIndex !== -1) tasks[taskIndex].task = input.value.trim();

    editTaskID = null;
  } else {
    tasks.push({
      id: Date.now(),
      task: input.value.trim(),
      completed: false,
    });
  }

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

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("btn-edit-task");
  editBtn.addEventListener("click", () => {
    editTask(task);
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("btn-delete-task");
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
  inputTask = document.getElementById("input-new-task");

  inputTask.value = task?.task;
  editTaskID = task.id;
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
