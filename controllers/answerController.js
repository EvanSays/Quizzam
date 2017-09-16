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
          error: `Could not find answers with the question id of ${questionId}`,
        });
      }
    })
    .catch(error => res.status(500).json({ error }));
};

exports.addAnswer = (req, res) => {
  const newAnswer = req.body;
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
  db('answer')
    .where('id', req.params.id)
    .select()
    .update(newPatch, 'id')
    .then((answer) => {
      res.status(201).json({ id: answer });
    })
    .catch(error => res.status(500).json({ error }));
};
