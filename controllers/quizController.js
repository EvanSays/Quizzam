const { db } = require('../server');

exports.index = (req, res) => {
  db('quiz').select()
    .then(quizzes => res.status(200).json(quizzes))
    .catch(error => res.status(500).json({ error }));
};

