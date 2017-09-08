const bcrypt = require('bcrypt');

exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('answer').del()
    .then(() => knex('question').del())
    .then(() => knex('quiz').del())
    .then(() => knex('folder').del())
    .then(() => knex('teacher').del())
    .then(() => {
      // Inserts seed entries

      return bcrypt.hash('password', 10)
        .then((hash) => {
          return knex('teacher').insert({
            email: 'joe@joe.com',
            password: hash,
            name: 'George Superteacher',
          }, '*');
        })
        .then((teacher) => {
          return knex('folder').insert({
            name: 'Pop Quiz',
            teacher_id: teacher[0].id,
          }, '*');
        })
        .then((folder) => {
          return knex('quiz').insert({
            name: 'First Quiz',
            folder_id: folder[0].id,
            teacher_id: folder[0].teacher_id,
            subject: 'Javascript',
            type: 'Pop Quiz',
          }, '*');
        })
        .then((quiz) => {
          return Promise.all([
            knex('question').insert({
              question_text: 'What is your favorite color?',
              quiz_id: quiz[0].id,
              subject: 'Jquery',
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
                    answer_text: 'Red',
                    question_id: answer[0].id,
                  }),
                  knex('answer').insert({
                    answer_text: 'Yellow',
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
              question_type: 'multiple choice-multiple answer',
              difficulty: 7,
            }, '*')
              .then((answer) => {
                return Promise.all([
                  knex('answer').insert({
                    answer_text: 'blamp',
                    question_id: answer[0].id,
                  }),
                  knex('answer').insert({
                    answer_text: 'map',
                    question_id: answer[0].id,
                    points: 1,
                    correct: true,
                  }),
                  knex('answer').insert({
                    answer_text: 'reduce',
                    question_id: answer[0].id,
                    points: 1,
                    correct: true,
                  }),
                  knex('answer').insert({
                    answer_text: 'split',
                    question_id: answer[0].id,
                  }),
                  knex('answer').insert({
                    answer_text: 'Chartreuse',
                    question_id: answer[0].id,
                  }),
                  knex('answer').insert({
                    answer_text: 'find',
                    question_id: answer[0].id,
                    points: 1,
                    correct: true,
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
        });
    });
};
