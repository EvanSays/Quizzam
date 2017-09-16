/* eslint-disable no-restricted-syntax */

const { db } = require('../server');

exports.index = (req, res) => {
  db('quiz').select()
    .then(quizzes => res.status(200).json(quizzes))
    .catch(error => res.status(500).json({ error }));
};

exports.addQuiz = (req, res) => {
  const newQuiz = req.body;
  for (const requiredParams of ['name', 'subject', 'type']) {
    if (!req.body[requiredParams]) {
      return res.status(422).json({ error: `You are missing the quiz ${requiredParams}!` });
    }
  }
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
  const { id } = req.params;

  db('quiz')
    .where({ id })
    .select()
    .update(newPatch, 'id')
    .then((quiz) => {
      if (!quiz.length) {
        return res.status(404).json({ error: `The quiz with ID# ${id} was not found and could not be updated` });
      }
      return res.status(201).json({ id: quiz[0] });
    })
    .catch(error => res.status(500).json({ error }));
};


exports.delQuiz = (req, res) => {
  const { id } = req.params;
  db('quiz')
    .where({ id })
    .del()
    .returning('*')
    .then((quiz) => {
      if (!quiz.length) {
        return res.status(404).json({ error: `The quiz with ID# ${id} was not found and could not be deleted` });
      }
      return res.status(200).json({
        success: `Quiz #${id} was deleted.`,
        deletedQuiz: quiz,
      });
    })
    .catch(error => res.status(500).json({ error }));
};
