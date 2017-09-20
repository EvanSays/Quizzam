const chai = require('chai');
const chaiHttp = require('chai-http');
const knex = require('../src/knex');
const { app } = require('../server');

const should = chai.should();

chai.use(chaiHttp);

describe('Answer API routes', () => {
  before((done) => {
    knex.migrate.latest()
      .then(() => done())
      .catch((err) => {
        throw new Error(err);
      });
  });

  beforeEach((done) => {
    knex.seed.run()
      .then(() => done())
      .catch((err) => {
        throw new Error(err);
      });
  });

  describe('GET /api/v1/questions/:questionId/answers', () => {
    it('Should return an array of all of the answers for a question ', (done) => {
      chai.request(app)
        .get('/api/v1/quizzes')
        .end((err, res) => {
          const id = res.body[0].id;

          chai.request(app)
            .get(`/api/v1/quizzes/${id}/questions`)
            .end((err1, res1) => {
              const testQuestion = res1.body.find(array => array.subject === 'Jquery');
              const questionId = testQuestion.id;

              chai.request(app)
                .get(`/api/v1/questions/${questionId}/answers`)
                .end((err2, res2) => {
                  const testAnswer = res2.body.find(array => array.answer_text === 'Blue');
                  should.not.exist(err);
                  res2.status.should.equal(200);
                  res2.should.be.json; //eslint-disable-line
                  res2.body.should.be.a('array');
                  res2.body.should.have.length(4);
                  res2.body.forEach((answer) => {
                    answer.should.include.keys('id', 'answer_text',
                      'question_id', 'points', 'correct',
                      'created_at', 'updated_at');
                  });
                  testAnswer.id.should.be.a('number');
                  testAnswer.answer_text.should.equal('Blue');
                  testAnswer.question_id.should.equal(questionId);
                  testAnswer.question_id.should.be.a('number');
                  testAnswer.points.should.equal(0);
                  testAnswer.points.should.be.a('number');
                  testAnswer.correct.should.equal(false);
                  testAnswer.created_at.should.be.a('string');
                  testAnswer.updated_at.should.be.a('string');
                  done();
                });
            });
        });
    });

    it('SAD PATH - Should return an error if the question ID does not exist', (done) => {
      chai.request(app)
        .get('/api/v1/questions/0/answers')
        .end((err, res) => {
          should.exist(err);
          should.exist(res.error);
          err.status.should.equal(404);
          const errorText = JSON.parse(err.response.error.text);

          errorText.error.should.equal('Could not find answers attached to the question id of 0');
          done();
        });
    });
  });
  
  //   chai.request(app)
  //     .get('/api/v1/quizzes')
  //     .end((err, res) => {
  //       const id = res.body[0].id;
  // 
  //       chai.request(app)
  //         .get(`/api/v1/quizzes/${id}/questions`)
  //         .end((err1, res1) => {
  //           const testQuestion = res1.body.find(array => array.subject === 'Jquery');
  //           const questionId = testQuestion.id;
  // 
  //           chai.request(app)
  //             .get(`/api/v1/questions/${questionId}/answers`)
  //             .end((err2, res2) => {
  //               const testAnswer = res2.body.find(array => array.answer_text === 'Blue');
  //               const answerId = testAnswer.id;
  // 
  //               chai.request(app)
  //                 .delete(`/api/v1/questions/${questionId}/answers/${answerId}`)
  //                 .end((err3, res3) => {
  // 
  //                   done();
  //                 });
  //             });
  //         });
  //     });
  // });

  describe('POST api/v1/questions/:questionId/answers', () => {
    it('Should return the answer\'s ID if a new answer is inserted', (done) => {
      chai.request(app)
        .get('/api/v1/quizzes')
        .end((err, res) => {
          const id = res.body[0].id;

          chai.request(app)
            .get(`/api/v1/quizzes/${id}/questions`)
            .end((err1, res1) => {
              const testQuestion = res1.body.find(array => array.subject === 'Jquery');
              const questionId = testQuestion.id;

              chai.request(app)
                .post(`/api/v1/questions/${questionId}/answers`)
                .send({
                  answer_text: 'Fido the dog',
                  points: 7,
                  question_id: questionId,
                })
                .end((err2, res2) => {
                  should.not.exist(err2);
                  res2.status.should.equal(201);
                  res2.should.be.json; //eslint-disable-line
                  res2.body.should.be.a('object');
                  res2.body.should.have.property('id');
                  res2.body.id.should.be.a('number');
                  done();
                });
            });
        });
    });

    it('Should exist in the database after being posted', (done) => {
      chai.request(app)
        .get('/api/v1/quizzes')
        .end((err, res) => {
          const id = res.body[0].id;

          chai.request(app)
            .get(`/api/v1/quizzes/${id}/questions`)
            .end((err1, res1) => {
              const testQuestion = res1.body.find(array => array.subject === 'Jquery');
              const questionId = testQuestion.id;
              res1.body.should.have.length(3);

              chai.request(app)
                .get(`/api/v1/questions/${questionId}/answers`)
                .end((err2, res2) => {
                  res2.body.should.have.length(4);

                  chai.request(app)
                    .post(`/api/v1/questions/${questionId}/answers`)
                    .send({
                      answer_text: 'Meow the Cat',
                      points: 3,
                      question_id: questionId,
                    })
                    .end((err3, res3) => {
                      should.exist(res3);

                      chai.request(app)
                        .get(`/api/v1/questions/${questionId}/answers`)
                        .end((err4, res4) => {
                          res4.body.should.have.length(5);
                          done();
                        });
                    });
                });
            });
        });
    });

    it('SAD PATH - Should not allow an answer to be posted if it\'s missing answer text', (done) => {
      chai.request(app)
        .get('/api/v1/quizzes')
        .end((err, res) => {
          const id = res.body[0].id;

          chai.request(app)
            .get(`/api/v1/quizzes/${id}/questions`)
            .end((err1, res1) => {
              const testQuestion = res1.body.find(array => array.subject === 'Jquery');
              const questionId = testQuestion.id;

              chai.request(app)
                .post(`/api/v1/questions/${questionId}/answers`)
                .send({
                  points: 7,
                  question_id: questionId,
                })
                .end((err2, res2) => {
                  should.exist(err2);
                  should.exist(res2);
                  res2.status.should.equal(422);
                  res2.res.should.have.property('statusMessage');
                  res2.res.statusMessage.should.equal('Unprocessable Entity');
                  res2.body.should.have.property('error');
                  res2.body.error.should.equal('You are missing the answer text!');
                  done();
                });
            });
        });
    });
  });

  describe('PATCH api/v1/questions/:questionId/answers/:answerId', () => {
    it('Should return the answer\'s ID if an existing answer is updated', (done) => {
      chai.request(app)
        .get('/api/v1/quizzes')
        .end((err, res) => {
          const id = res.body[0].id;

          chai.request(app)
            .get(`/api/v1/quizzes/${id}/questions`)
            .end((err1, res1) => {
              const testQuestion = res1.body.find(array => array.subject === 'Jquery');
              const questionId = testQuestion.id;

              chai.request(app)
                .get(`/api/v1/questions/${questionId}/answers`)
                .end((err2, res2) => {
                  const testAnswer = res2.body.find(array => array.answer_text === 'Blue');
                  const answerId = testAnswer.id;

                  chai.request(app)
                    .patch(`/api/v1/questions/${questionId}/answers/${answerId}`)
                    .send({
                      correct: true,
                    })
                    .end((err3, res3) => {
                      should.not.exist(err3);
                      res3.status.should.equal(201);
                      res3.should.be.json; //eslint-disable-line
                      res3.body.should.be.a('object');
                      res3.body.should.have.property('id');
                      res3.body.id.should.be.a('number');
                      res3.body.id.should.equal(answerId);
                      done();
                    });
                });
            });
        });
    });

    it('Should update the property of the answer that is sent in the request', (done) => {
      chai.request(app)
        .get('/api/v1/quizzes')
        .end((err, res) => {
          const id = res.body[0].id;

          chai.request(app)
            .get(`/api/v1/quizzes/${id}/questions`)
            .end((err1, res1) => {
              const testQuestion = res1.body.find(array => array.subject === 'Jquery');
              const questionId = testQuestion.id;

              chai.request(app)
                .get(`/api/v1/questions/${questionId}/answers`)
                .end((err2, res2) => {
                  const testAnswer = res2.body.find(array => array.answer_text === 'Blue');
                  const answerId = testAnswer.id;
                  testAnswer.correct.should.equal(false);

                  chai.request(app)
                    .patch(`/api/v1/questions/${questionId}/answers/${answerId}`)
                    .send({
                      correct: true,
                    })
                    .end((err3, res3) => {
                      should.exist(res3);

                      chai.request(app)
                        .get(`/api/v1/questions/${questionId}/answers`)
                        .end((err4, res4) => {
                          const testAnswer2 = res4.body.find(array => array.answer_text === 'Blue');
                          testAnswer2.correct.should.equal(true);
                          done();
                        });
                    });
                });
            });
        });
    });

    it('SAD PATH - Should return an error if the quiz does not exist', (done) => {
      chai.request(app)
        .patch('/api/v1/quizzes/0')
        .send({
          name: 'New Name',
        })
        .end((err, res) => {
          should.exist(res);
          res.status.should.equal(404);
          res.should.be.json; //eslint-disable-line
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.equal('The quiz with ID# 0 was not found and could not be updated');
          done();
        });
    });
  });

  describe('DELETE /api/v1/questions/:questionId/answers/:answerId', () => {
    it('Should return a success message and an object containing the answer that was deleted', (done) => {
      chai.request(app)
        .get('/api/v1/quizzes')
        .end((err, res) => {
          const id = res.body[0].id;

          chai.request(app)
            .get(`/api/v1/quizzes/${id}/questions`)
            .end((err1, res1) => {
              const testQuestion = res1.body.find(array => array.subject === 'Jquery');
              const questionId = testQuestion.id;

              chai.request(app)
                .get(`/api/v1/questions/${questionId}/answers`)
                .end((err2, res2) => {
                  const testAnswer = res2.body.find(array => array.answer_text === 'Blue');
                  const answerId = testAnswer.id;

                  chai.request(app)
                    .delete(`/api/v1/questions/${questionId}/answers/${answerId}`)
                    .end((err3, res3) => {
                      res3.body.should.have.property('success');
                      res3.body.success.should.equal(`Answer #${answerId} was deleted.`);
                      res3.body.should.have.property('deletedAnswer');
                      res3.body.deletedAnswer.should.be.a('array');
                      res3.body.deletedAnswer[0].id.should.equal(answerId);
                      res3.body.deletedAnswer[0].answer_text.should.equal('Blue');
                      res3.body.deletedAnswer[0].points.should.equal(0);
                      res3.body.deletedAnswer[0].correct.should.equal(false);
                      done();
                    });
                });
            });
        });
    });

    it('SAD PATH - Should return an error if the answer does not exist', (done) => {
      chai.request(app)
        .delete('/api/v1/questions/0/answers/0')
        .end((err, res) => {
          should.exist(res);
          res.status.should.equal(404);
          res.should.be.json; //eslint-disable-line
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.equal('The answer with ID# 0 was not found and could not be deleted');
          done();
        });
    });
  });
});
