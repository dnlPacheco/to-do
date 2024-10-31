const localStorageKey = 'to-do-list'

function getTodoList() {
    let tasks = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    return tasks
}

function addNewTask() {
    const input = document.querySelector('#input-new-task')

    if (!input.value) {
       return alert('Digite algum texto!')
    }

    let tasks = getTodoList()  
    
    tasks.push({
        id: Date.now(),
        task: input.value.trim()
    })

    localStorage.setItem(localStorageKey, JSON.stringify(tasks))

    input.value = ''

    showTodoList()

}

function showTodoList() {
    let tasks = getTodoList()
    let todoList = document.getElementById('to-do-list')

    todoList.innerHTML = ''

    // TODO adicionar checkbox para marcar tarefa concluída
    tasks.forEach(item => {
        const listItem = document.createElement('li')
        listItem.textContent = item.task
        

        const deleteBtn = document.createElement('button')
        deleteBtn.textContent = 'Delete'
        deleteBtn.addEventListener('click', (event) => {
            removeTask(item)
        })

        listItem.appendChild(deleteBtn)
        todoList.appendChild(listItem)

    });
}

function removeTask(item) {
    const tasks = getTodoList()
    const taskIndex = tasks.findIndex((task) => task?.id === item?.id)

    if(taskIndex !== -1) tasks.splice(taskIndex, 1)

    localStorage.setItem(localStorageKey, JSON.stringify(tasks))
    showTodoList()

}

showTodoList()
