/* eslint-disable no-console */
const chai = require('chai');
const chaiHttp = require('chai-http');
const knex = require('../src/knex');
const { app } = require('../server');

const should = chai.should();

chai.use(chaiHttp);

describe.only('Testing ________ API routes', () => {
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
    it('should return a 422 if email or password are not included', (done) => {
      chai.request(app)
        .post('/api/v1/users')
        .send({
          // Omitting email and password
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.type.should.equal('application/json');
          res.text.should.equal('"Missing user name or password"');
          done();
        });
    });
  });
  describe('POST /api/v1/users/new', () => {
    it();
  });
});
