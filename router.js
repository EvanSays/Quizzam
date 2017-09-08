const express = require('express');
const folder = require('./controllers/folderController');
const quiz = require('./controllers/quizController');

const router = express.Router();

// Folder
router.get('/folders', folder.index);

// Quiz
router.get('/quizzes', quiz.index);


module.exports = router;
