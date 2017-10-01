const express = require('express');
const user = require('./controllers/userController');
const quiz = require('./controllers/quizController');
const room = require('./controllers/roomController');
const question = require('./controllers/questionController');
const answer = require('./controllers/answerController');

const router = express.Router();

// Create a login/auth path

// User
router.get('/users/:id/folders', user.indexFolders);
router.post('/users/:userId/folders', user.addFolder);
router.post('/users', user.signIn);
router.post('/users/new', user.createUser);

// Quiz
router.get('/quizzes', quiz.index);
router.post('/quizzes', quiz.addQuiz);
router.patch('/quizzes/:id', quiz.editQuiz);
router.delete('/quizzes/:id', quiz.delQuiz);

// Questions
router.get('/quizzes/:quizId/questions', question.indexQuestions);
router.post('/quizzes/:quizId/questions', question.addQuestion);
router.patch('/questions/:questionId', question.editQuestion);
router.delete('/questions/:questionId', question.delQuestion);

// Answers
router.get('/questions/:questionId/answers', answer.indexAnswers);
router.post('/questions/:questionId/answers', answer.addAnswer);
router.patch('/answers/:answerId', answer.editAnswer);
router.delete('/answers/:answerId', answer.delAnswer);

// Room
router.get('/room/:id', room.quiz);
router.post('/room', room.addRoom);

module.exports = router;
