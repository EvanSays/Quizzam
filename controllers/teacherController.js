const { db } = require('../server');
const bcrypt = require('bcrypt');

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
    .then((folders) => {
      return Promise.all(folders.map((quizzes, index, array) => {
        return Promise.all(quizzes.quizzes.map((quiz, quizIndex, quizArray) => {
          return db('question').where('quiz_id', quiz.id).select()
            .then((questions) => {
              quizArray[quizIndex].questions = questions;
              return quizArray[quizIndex];
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
        .then((data) => {
          res.status(200).json(data);
        });
    });
};

exports.signIn = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(422).json({ Error: 'Missing user name or password' });
  }
  return db('teacher').where('email', req.body.email).select('password')
    .then((hash) => {
      bcrypt.compare(req.body.password, hash[0].password)
        .then((result) => {
          if (result) {
            return db('teacher').where('email', req.body.email).select('id', 'email', 'name')
              .then((teacher) => {
                res.status(201).json({
                  message: `Logged in successfully as ${teacher[0].name}`,
                  data: teacher[0],
                });
              })
              .catch((error) => {
                return res.status(500).json({ error });
              });
          }
          return res.status(401).json({ error: 'Incorrect email or password' });
        });
    })
    .catch(() => {
      return res.status(401).json({ error: 'Incorrect email or password' });
    });
};
