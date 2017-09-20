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
});
