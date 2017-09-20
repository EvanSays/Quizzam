const chai = require('chai');
const chaiHttp = require('chai-http');
const knex = require('../src/knex');
const { app } = require('../server');

const should = chai.should();

chai.use(chaiHttp);

describe('Room API routes', () => {
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

  describe('GET /api/v1/room/:id', () => {
    it('Should return the room ID when a quiz ID is posted', (done) => {
      chai.request(app)
        .get('/api/v1/quizzes')
        .end((err, res) => {
          const quizId = res.body[0].id;

          chai.request(app)
            .post('/api/v1/room')
            .send({
              quiz_id: parseInt(quizId, 10),
            })
            .end((err1, res1) => {
              const roomId = res1.body.id;
              should.not.exist(err1);
              res1.status.should.equal(201);

              chai.request(app)
                .get(`/api/v1/room/${roomId}`)
                .end((err2, res2) => {
                  const testQuestion = res2.body.questions.find(array => array.subject === 'Jquery');
                  should.not.exist(err);
                  res2.status.should.equal(200);
                  res2.should.be.json; //eslint-disable-line
                  res2.body.should.be.a('object');
                  testQuestion.should.include.keys('id', 'question_text',
                    'quiz_id', 'subject', 'question_type',
                    'difficulty', 'created_at', 'updated_at');
                  testQuestion.id.should.be.a('number');
                  testQuestion.question_text.should.equal('What is your favorite color?');
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
    });

    it('Should return the room ID when a quiz ID is posted', (done) => {
      chai.request(app)
        .get('/api/v1/quizzes')
        .end((err, res) => {
          const quizId = res.body[0].id;

          chai.request(app)
            .post('/api/v1/room')
            .send({
              quiz_id: parseInt(quizId, 10),
            })
            .end((err1, res1) => {
              should.not.exist(err1);
              res1.status.should.equal(201);
              res1.should.be.json; //eslint-disable-line
              res1.body.should.be.a('object');
              res1.body.should.have.property('id');
              res1.body.id.should.be.a('string');
              res1.body.id.should.have.length(4);
              done();
            });
        });
    });
  });
});
