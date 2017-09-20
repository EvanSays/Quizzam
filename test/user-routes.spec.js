/* eslint-disable no-console */
const chai = require('chai');

const should = chai.should();
const chaiHttp = require('chai-http');

const knex = require('../src/knex');
const { app } = require('../server');

chai.use(chaiHttp);

describe('Testing ________ API routes', () => {
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

  describe('POST /api/v1/users', () => {
    it('shold respond with a success message and a user', (done) => {
      chai.request(app)
        .post('/api/v1/users')
        .send({
          email: 'joe@joe.com',
          password: 'password',
        })
        .end((err, res) => {
          console.log(res.body);
          should.not.exist(err);
          res.status.should.equal(201);
          res.type.should.equal('application/json');
          res.body.message.should.equal(`Logged in successfully as ${res.body.data.first_name}`);
          res.body.data.should.include.keys(
            'id', 'email', 'first_name', 'last_name', 'token');
          done();
        });
    });
  });
});
