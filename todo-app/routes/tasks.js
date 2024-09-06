const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');
const taskController = require('../controllers/taskController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        // Сохраняем оригинальное имя файла и расширение
        const ext = path.extname(file.originalname); // получаем расширение файла
        const fileName = `${file.fieldname}-${Date.now()}${ext}`; // генерируем уникальное имя
        cb(null, fileName);
    }
});

const upload = multer({ storage });

router.get('/', taskController.getTasks);
router.post('/create', upload.single('file'), taskController.createTask);
router.post('/update/:id', taskController.updateTask);
router.post('/delete/:id', taskController.deleteTask);

module.exports = router;
