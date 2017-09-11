const { db } = require('../server');
const bcrypt = require('bcrypt');
const { auth } = require('../jwt-helper');

exports.indexFolders = (req, res) => {
  const user_id = req.params.id;
  db('folder').where({ user_id }).select()
    .then((folders) => {
      return Promise.all(folders.map((folder, index, array) => {
        return db('quiz').where('folder_id', folder.id).select()
          .then((quizzes) => {
            array[index].quizzes = quizzes;
            return array[index];
          })
          .catch(error => res.status(500).json({ error }));
      }));
    })
    .then((folders) => {
      return Promise.all(folders.map((quizzes, index, array) => {
        return Promise.all(quizzes.quizzes.map((quiz, quizIndex, quizArray) => {
          return db('question').where('quiz_id', quiz.id).select()
            .then((questions) => {
              quizArray[quizIndex].questions = questions;
              return quizArray[quizIndex];
            })
            .catch(error => res.status(500).json({ error }));
        })).then(() => {
          return array[index];
        })
          .catch(error => res.status(500).json({ error }));
      }))
        .then((folders) => {
          return Promise.all(folders.map((folder, index, array) => {
            return Promise.all(folder.quizzes.map((quiz, quizIndex, quizArray) => {
              return Promise.all(quiz.questions.map((question, questIndex, questArray) => {
                return db('answer').where('question_id', question.id).select()
                  .then((answers) => {
                    questArray[questIndex].answers = answers;
                    return questArray[questIndex];
                  })
                  .catch(error => res.status(500).json({ error }));
              }))
                .then(() => {
                  return quizArray[quizIndex];
                })
                .catch(error => res.status(500).json({ error }));
            }))
              .then(() => {
                return array[index];
              })
              .catch(error => res.status(500).json({ error }));
          }));
        })
        .catch(error => res.status(500).json({ error }))
        .then((data) => {
          res.status(200).json(data);
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.addFolder = (req, res) => {
  const name = req.body;
  const userId = req.params.userId;
  const newFolder = Object.assign({}, name, { user_id: parseInt(userId, 10) });

  return db('folder')
    .insert(newFolder, 'id')
    .then(folder => res.status(201).json({
      id: folder[0],
    }))
    .catch(error => res.status(500).json({
      error,
    }));
};

exports.createUser = (req, res) => {
  const user = req.body;

  if (!user.email || !user.password || !user.first_name || !user.last_name) {
    return res.status(422).json({ Error: 'Missing user name, password, or email' });
  }

  auth(user).then((finalUser) => {
    return db('user_account').insert(finalUser, ['id', 'first_name', 'last_name', 'email'])
      .then(data => res.status(201).json(data[0]))
      .catch(error => res.status(500).json({ error }));
  })
    .catch(error => res.status(500).json({ error }));
};

exports.signIn = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(422).json({ Error: 'Missing user name or password' });
  }
  return db('user_account').where('email', req.body.email).select('password')
    .then((hash) => {
      bcrypt.compare(req.body.password, hash[0].password)
        .then((result) => {
          if (result) {
            return db('user_account').where('email', req.body.email).select('id', 'email', 'first_name', 'last_name', 'token')
              .then((user) => {
                res.status(201).json({
                  message: `Logged in successfully as ${user[0].first_name}`,
                  data: user[0],
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
