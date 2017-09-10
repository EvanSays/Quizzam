const { db } = require('../server');

exports.quiz = (req, res) => {
  db('room').join('quiz', 'room.quiz_id', '=', 'quiz.id')
    .select('name', 'subject', 'type', 'room.id', 'quiz_id')
    .where('room.id', req.params.id)
    .then((currentQuiz) => {
      return db('question').where('quiz_id', currentQuiz[0].quiz_id).select()
        .then((questions) => {
          currentQuiz[0].questions = questions;
          return currentQuiz;
        })
        .then((quizWithQuestions) => {
          return Promise.all(quizWithQuestions[0].questions.map((question, questIndex, questArray) => {
            return db('answer').where('question_id', question.id).select()
              .then((answers) => {
                questArray[questIndex].answers = answers;
                return questArray[questIndex];
              });
          }))
            .then(() => quizWithQuestions);
        });
    })
    .then(data => res.status(200).json(data[0]));
};
