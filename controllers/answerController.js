/* eslint-disable no-restricted-syntax */

const { db } = require('../server');

exports.indexAnswers = (req, res) => {
  const { questionId } = req.params;
  db('answer')
    .where('question_id', questionId)
    .select()
    .then((answer) => {
      if (answer.length) {
        res.status(200).json(answer);
      } else {
        res.status(404).json({
          error: `Could not find answers attached to the question id of ${questionId}`,
        });
      }
    })
    .catch(error => res.status(500).json({ error }));
};

exports.addAnswer = (req, res) => {
  const newAnswer = req.body;
  for (const requiredParams of ['answer_text']) {
    if (!req.body[requiredParams]) {
      return res.status(422).json({ error: 'You are missing the answer text!' });
    }
  }
  return db('answer')
    .insert(newAnswer, 'id')
    .then(answer => res.status(201).json({
      id: answer[0],
    }))
    .catch(error => res.status(500).json({
      error,
    }));
};

exports.editAnswer = (req, res) => {
  const newPatch = req.body;
  const { answerId } = req.params;

  db('answer')
    .where('id', answerId)
    .select()
    .update(newPatch, 'id')
    .then((answer) => {
      if (!answer.length) {
        return res.status(404).json({ error: `The answer with ID# ${answerId} was not found and could not be updated` });
      }
      return res.status(201).json({ id: answer[0] });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.delAnswer = (req, res) => {
  const { answerId } = req.params;

  db('answer')
    .where('id', answerId)
    .del()
    .returning('*')
    .then((answer) => {
      if (!answer.length) {
        return res.status(404).json({ error: `The answer with ID# ${answerId} was not found and could not be deleted` });
      }
      return res.status(200).json({
        success: `Answer #${answerId} was deleted.`,
        deletedAnswer: answer,
      });
    })
    .catch(error => res.status(500).json({ error }));
};
