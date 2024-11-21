function generateTaskId() {
    return Date.now()
}

function createTask(id, task, completed = false) {
    return { id, task, completed }
}

export { createTask, generateTaskId }
