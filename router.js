const express = require('express');
const user = require('./controllers/userController');
const auth = require('./controllers/authController');
const quiz = require('./controllers/quizController');
const room = require('./controllers/roomController');

const router = express.Router();


// User
router.get('/users/:id/folders', user.indexFolders);
router.post('/users', user.signIn);

// Authorization
router.post('/auth', auth.auth);


// Quiz
router.get('/quizzes', quiz.index);

// Room 
router.get('/room/:id', room.quiz);

module.exports = router;
