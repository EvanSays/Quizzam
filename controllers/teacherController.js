const { db } = require('../server');

exports.indexFolders = (req, res) => {
  const teacher_id = req.params.id;
  db('folder').where({ teacher_id }).select()
    .then((folders) => {
      return Promise.all(folders.map((folder, index, array) => {
        return db('quiz').where('folder_id', folder.id).select()
          .then((quizzes) => {
            array[index].quizzes = quizzes;
            return array[index];
          });
      }));
    })
    .then((quizzes) => {
      return Promise.all(quizzes.map((quiz, index, array) => {
        return Promise.all(quiz.quizzes.map((qz, i, a) => {
          return db('question').where('quiz_id', qz.id).select()
            .then((questions) => {
              a[i].questions = questions;
              return a[i];
            });
        })).then(() => {
          return array[index];
        });
      }))
        .then((folders) => {
          return Promise.all(folders.map((folder, index, array) => {
            return Promise.all(folder.quizzes.map((quiz, quizIndex, quizArray) => {
              return Promise.all(quiz.questions.map((question, questIndex, questArray) => {
                return db('answer').where('question_id', question.id).select()
                  .then((answers) => {
                    questArray[questIndex].answers = answers;
                    return questArray[questIndex];
                  });
              }))
                .then(() => {
                  return quizArray[quizIndex];
                });
            }))
              .then(() => {
                return array[index];
              });
          }));
        })
        .then((stuff) => {
          res.status(200).json(stuff);
        });
    });
};
