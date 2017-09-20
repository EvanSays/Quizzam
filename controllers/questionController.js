/* eslint-disable no-restricted-syntax */

const { db } = require('../server');

exports.indexQuestions = (req, res) => {
  const { quizId } = req.params;
  db('question')
    .where('quiz_id', quizId)
    .select()
    .then((question) => {
      if (question.length) {
        res.status(200).json(question);
      } else {
        res.status(404).json({
          error: `Could not find questions with the quiz id of ${quizId}`,
        });
      }
    })
    .catch(error => res.status(500).json({ error }));
};

exports.addQuestion = (req, res) => {
  const newQuestion = req.body;
  for (const requiredParams of ['question_text']) {
    if (!req.body[requiredParams]) {
      return res.status(422).json({ error: 'You are missing the question text!' });
    }
  }
  return db('question')
    .returning('id')
    .insert(newQuestion)
    .then(question => res.status(201).json({
      id: question[0],
    }))
    .catch(error => res.status(500).json({
      error,
    }));
};

exports.editQuestion = (req, res) => {
  const newPatch = req.body;
  const { questionId } = req.params;

  db('question')
    .where('id', questionId)
    .select()
    .update(newPatch, 'id')
    .then((question) => {
      if (!question.length) {
        return res.status(404).json({ error: `The question with ID# ${questionId} was not found and could not be updated` });
      }
      return res.status(201).json({ id: question[0] });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.delQuestion = (req, res) => {
  const { questionId } = req.params;

  db('question')
    .where('id', questionId)
    .del()
    .returning('*')
    .then((question) => {
      if (!question.length) {
        return res.status(404).json({ error: `The question with ID# ${questionId} was not found and could not be deleted` });
      }
      return res.status(200).json({
        success: `Question #${questionId} was deleted.`,
        deletedQuestion: question,
      });
    })
    .catch(error => res.status(500).json({ error }));
};
