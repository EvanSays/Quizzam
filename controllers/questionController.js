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
