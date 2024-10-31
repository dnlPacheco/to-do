const localStorageKey = "to-do-list";

function getTodoList() {
  let tasks = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
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

  let tasks = getTodoList();

  tasks.push({
    id: Date.now(),
    task: input.value.trim(),
  });

  saveTodoList(tasks);

  input.value = "";

  showTodoList();
}

function createListItem(task) {
  const listItem = document.createElement("li");
  listItem.textContent = task?.task;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => {
    removeTask(task);
  });
  listItem.appendChild(deleteBtn);

  return listItem;
}

function showTodoList() {
  let tasks = getTodoList();
  let todoList = document.getElementById("to-do-list");
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
