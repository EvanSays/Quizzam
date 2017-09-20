const chai = require('chai');
const chaiHttp = require('chai-http');
const knex = require('../src/knex');
const { app } = require('../server');

const should = chai.should();

chai.use(chaiHttp);

describe('Question API routes', () => {
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

  describe('GET /api/v1/questions', () => {
    it('Should return an array of all of the questions', (done) => {
      chai.request(app)
        .get('/api/v1/quizzes')
        .end((err, res) => {
          res.status.should.equal(200);
          const id = res.body[0].id;

          chai.request(app)
            .get(`/api/v1/quizzes/${id}/questions`)
            .end((err1, res1) => {
              const testQuestion = res1.body.find(array => array.subject === 'Jquery');
              should.not.exist(err);
              res1.status.should.equal(200);
              res1.should.be.json; //eslint-disable-line
              res1.body.should.be.a('array');
              res1.body.should.have.length(3);
              res1.body.forEach((question) => {
                question.should.include.keys('id', 'question_text',
                  'quiz_id', 'subject', 'question_type',
                  'difficulty', 'created_at', 'updated_at');
              });
              testQuestion.id.should.be.a('number');
              testQuestion.question_text.should.equal('What is your favorite color?');
              testQuestion.quiz_id.should.equal(id);
              testQuestion.quiz_id.should.be.a('number');
              testQuestion.subject.should.equal('Jquery');
              testQuestion.question_type.should.equal('multiple choice');
              testQuestion.difficulty.should.equal(1);
              testQuestion.created_at.should.be.a('string');
              testQuestion.updated_at.should.be.a('string');
              done();
            });
        });
    });

    it('SAD PATH - Should return an error if the quiz ID does not exist', (done) => {
      chai.request(app)
        .get('/api/v1/quizzes/0/questions')
        .end((err, res) => {
          should.exist(err);
          should.exist(res.error);
          err.status.should.equal(404);
          const errorText = JSON.parse(err.response.error.text);

          errorText.error.should.equal('Could not find questions with the quiz id of 0');
          done();
        });
    });
  });

  describe('POST /api/v1/quizzes/:id/questions', () => {
    it('Should return the new question\'s ID if a new question is inserted', (done) => {
      chai.request(app)
        .get('/api/v1/quizzes')
        .end((err, res) => {
          res.status.should.equal(200);
          const id = res.body[0].id;

          chai.request(app)
            .post(`/api/v1/quizzes/${id}/questions`)
            .send({
              question_text: 'How old is the Moon?',
              subject: 'lunar studies',
              question_type: 'multiple choice',
              difficulty: 10,
              quiz_id: id,
            })
            .end((err1, res1) => {
              res1.status.should.equal(201);
              res1.should.be.json; //eslint-disable-line
              res1.body.should.be.a('object');
              res1.body.should.have.property('id');
              done();
            });
        });
    });

    it('Should exist in the database after being posted', (done) => {
      chai.request(app)
        .get('/api/v1/quizzes')
        .end((err, res) => {
          res.status.should.equal(200);
          const id = res.body[0].id;

          chai.request(app)
            .get(`/api/v1/quizzes/${id}/questions`)
            .end((err1, res1) => {
              res1.status.should.equal(200);
              res1.body.should.be.a('array');
              res1.body.should.have.length(3);

              chai.request(app)
                .post(`/api/v1/quizzes/${id}/questions`)
                .send({
                  question_text: 'How old is the Moon?',
                  subject: 'lunar studies',
                  question_type: 'multiple choice',
                  difficulty: 10,
                  quiz_id: id,
                })
                .end((err2, res2) => {
                  res2.status.should.equal(201);

                  chai.request(app)
                    .get(`/api/v1/quizzes/${id}/questions`)
                    .end((err3, res3) => {
                      res3.status.should.equal(200);
                      res3.body.should.be.a('array');
                      res3.body.should.have.length(4);
                      done();
                    });
                });
            });
        });
    });
  });
});
