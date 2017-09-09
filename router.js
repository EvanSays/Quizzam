const express = require('express');
const teacher = require('./controllers/teacherController');
const quiz = require('./controllers/quizController');

const router = express.Router();

// Teacher
router.get('/teachers/:id/folders', teacher.indexFolders);

// Quiz
router.get('/quizzes', quiz.index);


module.exports = router;
