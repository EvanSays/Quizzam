const express = require('express');
const folder = require('./controllers/folderController');

const router = express.Router();

// Folder
router.get('/folders', folder.index);


module.exports = router;
