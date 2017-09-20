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
