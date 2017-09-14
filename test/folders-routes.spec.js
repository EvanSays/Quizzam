const chai = require('chai');
const chaiHttp = require('chai-http');
const knex = require('../src/knex');
const { app } = require('../server');

const should = chai.should();

chai.use(chaiHttp);

describe('Folder API routes', () => {
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

  describe('GET /api/v1/folder', () => {
    it('should do something', (done) => {
      chai.request(app)
        .get('/quizzes')
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          done();
        });
    });
  });
});
