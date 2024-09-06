const Task = require('../models/taskModel');

exports.getTasks = (req, res) => {
    const { sort } = req.query;
    let tasks = Task.getAll(); // Получаем все задачи из модели

    // Применяем сортировку
    if (sort === 'dateAsc') {
        tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)); // По возрастанию даты
    } else if (sort === 'dateDesc') {
        tasks.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate)); // По убыванию даты
    } else if (sort === 'statusAsc') {
        tasks.sort((a, b) => a.status.localeCompare(b.status)); // По возрастанию статуса (алфавитно)
    } else if (sort === 'statusDesc') {
        tasks.sort((a, b) => b.status.localeCompare(a.status)); // По убыванию статуса (алфавитно)
    }

    res.render('index', { tasks, sort });
};

exports.createTask = (req, res) => {
    const { title, status, dueDate } = req.body;
    const file = req.file ? req.file.filename : null;
    Task.create({ title, status, dueDate, file });
    res.redirect('/');
};

exports.updateTask = (req, res) => {
    const { id } = req.params;
    const { title, status, dueDate } = req.body;
    Task.update(id, { title, status, dueDate });
    res.redirect('/');
};

exports.deleteTask = (req, res) => {
    const { id } = req.params;
    Task.delete(id);
    res.redirect('/');
};

