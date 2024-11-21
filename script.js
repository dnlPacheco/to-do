const localStorageKey = "to-do-list";

const form = document.querySelector("#form");

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

function confirmEditTask() {}

function editTask(task) {
  const inputEditTask = document.getElementById("input-edit-task");
  const modal = document.querySelector("dialog");

  // Atribui o ID da tarefa ao modal
  modal.setAttribute("data-id", task.id);

  // Preenche o campo de entrada com o valor da tarefa
  inputEditTask.value = task.task;

  // Mostra o modal
  modal.showModal();
}

document.getElementById("btn-edit").addEventListener("click", () => {
  const inputEditTask = document.getElementById("input-edit-task");
  const modal = document.querySelector("dialog");
  const taskId = modal.getAttribute("data-id"); // Recupera o ID armazenado no modal

  const tasks = getTodoList();

  // Localiza a tarefa pelo ID
  const taskIndex = tasks.findIndex((t) => t.id === Number(taskId));

  if (taskIndex !== -1) {
    tasks[taskIndex].task = inputEditTask.value.trim();
    saveTodoList(tasks);
    showTodoList();
  }

  // Fecha o modal e remove o atributo data-id
  closeModal();
  modal.removeAttribute("data-id");
});


document.getElementById("btn-cancel-edit").addEventListener("click", () => {
  const modal = document.querySelector("dialog");

  // Fecha o modal e limpa o atributo data-id
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
