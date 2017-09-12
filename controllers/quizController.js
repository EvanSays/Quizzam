const { db } = require('../server');

exports.index = (req, res) => {
  db('quiz').select()
    .then(quizzes => res.status(200).json(quizzes))
    .catch(error => res.status(500).json({ error }));
};

exports.addQuiz = (req, res) => {
  const newQuiz = req.body;
  return db('quiz')
    .insert(newQuiz, 'id')
    .then(quiz => res.status(201).json({
      id: quiz[0],
    }))
    .catch(error => res.status(500).json({
      error,
    }));
};

exports.editQuiz = (req, res) => {
  const newPatch = req.body;
  db('quiz')
    .where('id', req.params.id)
    .select()
    .update(newPatch, 'id')
    .then((quiz) => {
      res.status(201).json({ id: quiz });
    })
    .catch(error => res.status(500).json({ error }));
};

