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
            quiz.should.include.keys('id', 'name',
              'folder_id', 'user_id', 'subject', 'type',
              'created_at', 'updated_at');
          });
          res.body[0].name.should.equal('First Quiz');
          res.body[0].subject.should.equal('Javascript');
          res.body[0].type.should.equal('Pop Quiz');
          res.body[0].id.should.be.a('number');
          res.body[0].folder_id.should.be.a('number');
          res.body[0].user_id.should.be.a('number');
          res.body[0].created_at.should.be.a('string');
          res.body[0].updated_at.should.be.a('string');
          done();
        });
    });
  });
});
