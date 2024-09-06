const tasks = [];

class Task {
    constructor(title, status = 'pending', dueDate = null, file = null) {
        this.id = tasks.length + 1;
        this.title = title;
        this.status = status;
        this.dueDate = dueDate;
        this.file = file;
    }

    static getAll() {
        return tasks;
    }

    static getById(id) {
        return tasks.find(task => task.id == id);
    }

    static create(data) {
        console.log(tasks);
        const task = new Task(data.title, data.status, data.dueDate, data.file);
        tasks.push(task);
        return task;
    }

    static update(id, data) {
        const task = Task.getById(id);
        if (task) {
            task.title = data.title || task.title;
            task.status = data.status || task.status;
            task.dueDate = data.dueDate || task.dueDate;
            task.file = data.file || task.file;
        }
        return task;
    }

    static delete(id) {
        console.log(tasks);
        const index = tasks.findIndex(task => task.id == id);
        if (index !== -1) {
            tasks.splice(index, 1);
        }
    }
}

module.exports = Task;
