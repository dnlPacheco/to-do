const localStorageKey = "to-do-list";

function generateTaskId() {
  return Date.now();
}

function createTask(id, task, completed = false) {
  return { id, task, completed };
}

function getTodoList() {
  const tasks = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
  return tasks;
}

function saveTodoList(tasks) {
  localStorage.setItem(localStorageKey, JSON.stringify(tasks));
}

export { createTask, generateTaskId, saveTodoList, getTodoList };
