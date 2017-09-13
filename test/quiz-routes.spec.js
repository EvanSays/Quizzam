const chai = require('chai');
const chaiHttp = require('chai-http');
const knex = require('../src/knex');
const { app } = require('../server');

const should = chai.should();

chai.use(chaiHttp);

describe('Quiz API routes', () => {
  before((done) => {
    knex.migrate.latest()
      .then(() => done())
      .catch(err => console.log(err));
  });

  beforeEach((done) => {
    knex.seed.run()
      .then(() => done())
      .catch(err => console.log(err));
  });

  describe('GET /api/v1/quizzes', () => {
    it('return an array of all of the quizzes', (done) => {
      chai.request(app)
        .get('/api/v1/quizzes')
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.should.be.json; //eslint-disable-line
          res.body.should.be.a('array');
          res.body.should.have.length(1);
          res.body.forEach((quiz) => {
            quiz.should.have.property('id');
            quiz.should.have.property('name');
            quiz.should.have.property('folder_id');
            quiz.should.have.property('user_id');
            quiz.should.have.property('subject');
            quiz.should.have.property('type');
            quiz.should.have.property('created_at');
            quiz.should.have.property('updated_at');
          });
          done();
        });
    });
  });
});
