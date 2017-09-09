const express = require('express');

const user = require('./controllers/userController');

const auth = require('./controllers/authController');

const quiz = require('./controllers/quizController');

const router = express.Router();


// User
router.get('/users/:id/folders', user.indexFolders);
router.post('/users', user.signIn);

// Authorization
router.post('/auth', auth.auth);


// Quiz
router.get('/quizzes', quiz.index);

module.exports = router;
