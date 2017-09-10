const express = require('express');
const user = require('./controllers/userController');
const auth = require('./controllers/authController');
const quiz = require('./controllers/quizController');
const question = require('./controllers/questionController');

const router = express.Router();

// User
router.get('/users/:id/folders', user.indexFolders);
router.post('/users', user.signIn);

// Authorization
router.post('/auth', auth.auth);

// Quiz
router.get('/quizzes', quiz.index);
router.post('/quizzes', quiz.addQuiz);
router.get('/quizzes/:quizId/questions', quiz.indexQuestions)

// Question
router.get('/questions', question.index);

module.exports = router;
