const bcrypt = require('bcrypt');

exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('answer').del()
    .then(() => knex('question').del())
    .then(() => knex('room').del())
    .then(() => knex('quiz').del())
    .then(() => knex('folder').del())
    .then(() => knex('user_account').del())
    .then(() => {
      // Inserts seed entries

      return bcrypt.hash('password', 10)
        .then((hash) => {
          return knex('user_account').insert({
            email: 'joe@joe.com',
            password: hash,
            first_name: 'George',
            last_name: 'Superuser',
            token: 'XXXXXXX',
          }, '*');
        })
        .then((user) => {
          return knex('folder').insert({
            name: 'Pop Quiz',
            user_id: user[0].id,
          }, '*');
        })
        .then((folder) => {
          return Promise.all([
            knex('quiz').insert({
              name: 'Demo Night',
              folder_id: folder[0].id,
              user_id: folder[0].user_id,
              subject: 'Fun Times',
              type: 'Pop Quiz',
            }, '*')
              .then((quiz) => {
                return Promise.all([
                  knex('question').insert({
                    question_text: 'What is your quest?',
                    quiz_id: quiz[0].id,
                    subject: 'Jquery',
                    question_type: 'multiple choice',
                    difficulty: 1,
                  }, '*')
                    .then((answer) => {
                      return Promise.all([
                        knex('answer').insert({
                          answer_text: 'To find the holy grail',
                          question_id: answer[0].id,
                        }),
                        knex('answer').insert({
                          answer_text: 'To get a job',
                          question_id: answer[0].id,
                        }),
                        knex('answer').insert({
                          answer_text: 'To grind the holy fail',
                          question_id: answer[0].id,
                        }),
                        knex('answer').insert({
                          answer_text: 'To win the 4th of July Hot Dog eating contest',
                          question_id: answer[0].id,
                          points: 1,
                          correct: true,
                        }),
                      ]);
                    }),
                  knex('question').insert({
                    question_text: 'What is your favorite color?',
                    quiz_id: quiz[0].id,
                    subject: 'Colors',
                    question_type: 'multiple choice',
                    difficulty: 3,
                  }, '*')
                    .then((answer) => {
                      return Promise.all([
                        knex('answer').insert({
                          answer_text: 'Blue…wait, no…green',
                          question_id: answer[0].id,
                        }),
                        knex('answer').insert({
                          answer_text: 'Elephant',
                          question_id: answer[0].id,

                        }),
                        knex('answer').insert({
                          answer_text: 'Red',
                          question_id: answer[0].id,

                        }),
                        knex('answer').insert({
                          answer_text: 'Chartreuse',
                          question_id: answer[0].id,
                          points: 1,
                          correct: true,
                        }),
                      ]);
                    }),
                  knex('question').insert({
                    question_text: 'What is the airspeed velocity of an unladen swallow?',
                    quiz_id: quiz[0].id,
                    subject: 'Birds',
                    question_type: 'multiple choice',
                    difficulty: 7,
                  }, '*')
                    .then((answer) => {
                      return Promise.all([
                        knex('answer').insert({
                          answer_text: 'An African or European swallow?',
                          question_id: answer[0].id,
                        }),
                        knex('answer').insert({
                          answer_text: '10',
                          question_id: answer[0].id,
                          points: 1,
                          correct: true,
                        }),
                        knex('answer').insert({
                          answer_text: 'Swallows are not birds',
                          question_id: answer[0].id,
                        }),
                        knex('answer').insert({
                          answer_text: '72 MPH',
                          question_id: answer[0].id,
                        }),
                      ]);
                    }),
                  knex('question').insert({
                    question_text: 'How is the family name spelled in the popular bear family children book series?',
                    quiz_id: quiz[0].id,
                    subject: 'Books',
                    question_type: 'multiple choice',
                    difficulty: 7,
                  }, '*')
                    .then((answer) => {
                      return Promise.all([
                        knex('answer').insert({
                          answer_text: 'Berenstein Bears',
                          question_id: answer[0].id,
                        }),
                        knex('answer').insert({
                          answer_text: 'Barry the barely there bear',
                          question_id: answer[0].id,
                          points: 1,
                          correct: true,
                        }),
                        knex('answer').insert({
                          answer_text: 'Berenstain Bears',
                          question_id: answer[0].id,
                        }),
                        knex('answer').insert({
                          answer_text: 'Beepboopbot the Bearbots',
                          question_id: answer[0].id,
                        }),
                      ]);
                    }),
                  knex('question').insert({
                    question_text: 'What should Jeff\'s next haircut be?',
                    quiz_id: quiz[0].id,
                    subject: 'Hair',
                    question_type: 'multiple choice',
                    difficulty: 7,
                  }, '*')
                    .then((answer) => {
                      return Promise.all([
                        knex('answer').insert({
                          answer_text: 'That flippy thing',
                          question_id: answer[0].id,
                        }),
                        knex('answer').insert({
                          answer_text: 'Shaved head',
                          question_id: answer[0].id,
                        }),
                        knex('answer').insert({
                          answer_text: 'Mullet',
                          question_id: answer[0].id,
                        }),
                        knex('answer').insert({
                          answer_text: 'Man Bun',
                          question_id: answer[0].id,
                          correct: true,
                        }),
                        knex('answer').insert({
                          answer_text: 'Mohawk',
                          question_id: answer[0].id,
                        }),
                        knex('answer').insert({
                          answer_text: 'Dreadlocks',
                          question_id: answer[0].id,
                        }),
                        knex('answer').insert({
                          answer_text: 'Side spike',
                          question_id: answer[0].id,
                        }),
                      ]);
                    }),
                ]);
              }),
            knex('quiz').insert({
              name: 'Mid Mod Quiz',
              folder_id: folder[0].id,
              user_id: folder[0].user_id,
              subject: 'Jquery',
              type: 'Mid Mod Assessment',
            }, '*')
              .then((quiz) => {
                return Promise.all([
                  knex('question').insert({
                    question_text: 'What is your favorite movie?',
                    quiz_id: quiz[0].id,
                    subject: 'Cinema',
                    question_type: 'multiple choice',
                    difficulty: 1,
                  }, '*')
                    .then((answer) => {
                      return Promise.all([
                        knex('answer').insert({
                          answer_text: 'Blue',
                          question_id: answer[0].id,
                        }),
                        knex('answer').insert({
                          answer_text: 'Pulp Fiction',
                          question_id: answer[0].id,
                        }),
                        knex('answer').insert({
                          answer_text: 'Square',
                          question_id: answer[0].id,
                        }),
                        knex('answer').insert({
                          answer_text: 'Cinderella',
                          question_id: answer[0].id,
                          points: 1,
                          correct: true,
                        }),
                      ]);
                    }),
                  knex('question').insert({
                    question_text: 'What does a bird eat?',
                    quiz_id: quiz[0].id,
                    subject: 'Arrays',
                    question_type: 'true/false',
                    difficulty: 3,
                  }, '*')
                    .then((answer) => {
                      return Promise.all([
                        knex('answer').insert({
                          answer_text: 'Rocks',
                          question_id: answer[0].id,
                        }),
                        knex('answer').insert({
                          answer_text: 'Birdseed',
                          question_id: answer[0].id,
                          points: 1,
                          correct: true,
                        }),
                      ]);
                    }),
                  knex('question').insert({
                    question_text: 'Which of the following are array prototypes?',
                    quiz_id: quiz[0].id,
                    subject: 'Arrays',
                    question_type: 'multiple choice',
                    difficulty: 7,
                  }, '*')
                    .then((answer) => {
                      return Promise.all([
                        knex('answer').insert({
                          answer_text: 'blump',
                          question_id: answer[0].id,
                        }),
                        knex('answer').insert({
                          answer_text: 'mopp',
                          question_id: answer[0].id,
                        }),
                        knex('answer').insert({
                          answer_text: 'reduce',
                          question_id: answer[0].id,
                          points: 1,
                          correct: true,
                        }),
                        knex('answer').insert({
                          answer_text: 'splot',
                          question_id: answer[0].id,
                        }),
                      ]);
                    }),
                ]);
              }),
            knex('quiz').insert({
              name: 'Final Exam',
              folder_id: folder[0].id,
              user_id: folder[0].user_id,
              subject: 'All of the Things',
              type: 'Final Exam',
            }, '*')
              .then((quiz) => {
                return Promise.all([
                  knex('question').insert({
                    question_text: 'What is your favorite food?',
                    quiz_id: quiz[0].id,
                    subject: 'Food',
                    question_type: 'multiple choice',
                    difficulty: 1,
                  }, '*')
                    .then((answer) => {
                      return Promise.all([
                        knex('answer').insert({
                          answer_text: 'Pizza',
                          question_id: answer[0].id,
                        }),
                        knex('answer').insert({
                          answer_text: 'Red',
                          question_id: answer[0].id,
                        }),
                        knex('answer').insert({
                          answer_text: 'Rocks',
                          question_id: answer[0].id,
                        }),
                        knex('answer').insert({
                          answer_text: 'Mountain Dew Code Red',
                          question_id: answer[0].id,
                          points: 1,
                          correct: true,
                        }),
                      ]);
                    }),
                  knex('question').insert({
                    question_text: 'What does the Array prototype map return?',
                    quiz_id: quiz[0].id,
                    subject: 'Arrays',
                    question_type: 'true/false',
                    difficulty: 3,
                  }, '*')
                    .then((answer) => {
                      return Promise.all([
                        knex('answer').insert({
                          answer_text: 'A string',
                          question_id: answer[0].id,
                        }),
                        knex('answer').insert({
                          answer_text: 'An array',
                          question_id: answer[0].id,
                          points: 1,
                          correct: true,
                        }),
                      ]);
                    }),
                  knex('question').insert({
                    question_text: 'Which of the following are array prototypes?',
                    quiz_id: quiz[0].id,
                    subject: 'Arrays',
                    question_type: 'multiple choice',
                    difficulty: 7,
                  }, '*')
                    .then((answer) => {
                      return Promise.all([
                        knex('answer').insert({
                          answer_text: 'blamp',
                          question_id: answer[0].id,
                        }),
                        knex('answer').insert({
                          answer_text: 'mamp',
                          question_id: answer[0].id,
                        }),
                        knex('answer').insert({
                          answer_text: 'redamp',
                          question_id: answer[0].id,
                        }),
                        knex('answer').insert({
                          answer_text: 'pop',
                          question_id: answer[0].id,
                          points: 2,
                          correct: true,
                        }),
                      ]);
                    }),
                ]);
              }),
          ]);
        });
    });
};
