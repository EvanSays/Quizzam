const express = require('express');
const user = require('./controllers/userController');
const quiz = require('./controllers/quizController');
const room = require('./controllers/roomController');
const question = require('./controllers/questionController');

const router = express.Router();

// User
router.get('/users/:id/folders', user.indexFolders);
router.post('/users', user.signIn);
router.post('/users/new', user.createUser);

// Quiz
router.get('/quizzes', quiz.index);
router.post('/quizzes', quiz.addQuiz);

router.get('/quizzes/:quizId/questions', quiz.indexQuestions);
router.post('/quizzes/:quizId/questions', quiz.addQuestion);

// Answers
router.get('/questions/:questionId/answers', question.indexAnswers);
router.post('/questions/:questionId/answers', question.addAnswer);

// Room
router.get('/room/:id', room.quiz);
router.post('/room/:quiz_id', room.addRoom);

module.exports = router;
