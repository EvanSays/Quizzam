const express = require('express');
const auth = require('./controllers/authController');
const teacher = require('./controllers/teacherController');
const quiz = require('./controllers/quizController');

const router = express.Router();

// Authorization
router.post('/auth', auth.auth);

// Teacher
router.get('/teachers/:id/folders', teacher.indexFolders);

// Quiz
router.get('/quizzes', quiz.index);

module.exports = router;
