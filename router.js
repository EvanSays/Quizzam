const express = require('express');

const user = require('./controllers/userController');

const quiz = require('./controllers/quizController');

const router = express.Router();


// User
router.get('/users/:id/folders', user.indexFolders);
router.post('/users', user.signIn);
router.post('/users/new', user.createUser);

// Quiz
router.get('/quizzes', quiz.index);

module.exports = router;
