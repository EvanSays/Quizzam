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
    .then(quiz => res.status(201).json({ id: quiz[0] }))
    .catch(error => res.status(500).json({ error }));
}

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
}