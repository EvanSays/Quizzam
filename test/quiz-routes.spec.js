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
    it('Should return an array of all of the quizzes', (done) => {
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

  describe('POST api/v1/quizzes', () => {
    it('Should return the quiz\'s ID if a new quiz is inserted', (done) => {
      chai.request(app)
        .post('/api/v1/quizzes')
        .send({
          name: 'Best Quiz!',
          subject: 'Math',
          type: 'Pop quiz',
        })
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(201);
          res.should.be.json; //eslint-disable-line
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.id.should.be.a('number');
          done();
        });
    });

    it('Should exist in the database after being posted', (done) => {
      chai.request(app)
        .get('/api/v1/quizzes')
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.body.should.have.length(1);

          chai.request(app)
            .post('/api/v1/quizzes')
            .send({
              name: 'Best Quiz!',
              subject: 'Math',
              type: 'Pop quiz',
            })
            .end((err1, res1) => {
              should.not.exist(err);
              res1.status.should.equal(201);

              chai.request(app)
                .get('/api/v1/quizzes')
                .end((err2, res2) => {
                  should.not.exist(err);
                  res2.status.should.equal(200);
                  res2.body.should.have.length(2);
                  res2.body[1].should.have.property('name');
                  res2.body[1].name.should.equal('Best Quiz!');
                  done();
                });
            });
        });
    });

    it('SAD PATH - Should not allow a quiz to be posted if it\'s missing a quiz name', (done) => {
      chai.request(app)
        .post('/api/v1/quizzes')
        .send({
          subject: 'Math',
          type: 'Pop quiz',
        })
        .end((err, res) => {
          should.exist(err);
          should.exist(res);
          res.status.should.equal(422);
          res.res.should.have.property('statusMessage');
          res.res.statusMessage.should.equal('Unprocessable Entity');
          res.body.should.have.property('error');
          res.body.error.should.equal('You are missing the quiz name!');
          done();
        });
    });

    it('SAD PATH - Should not allow a quiz to be posted if it\'s missing a quiz subject', (done) => {
      chai.request(app)
        .post('/api/v1/quizzes')
        .send({
          name: 'Super Duper Quiz!!!',
          type: 'Pop quiz',
        })
        .end((err, res) => {
          should.exist(err);
          should.exist(res);
          res.status.should.equal(422);
          res.res.should.have.property('statusMessage');
          res.res.statusMessage.should.equal('Unprocessable Entity');
          res.body.should.have.property('error');
          res.body.error.should.equal('You are missing the quiz subject!');
          done();
        });
    });

    it('SAD PATH - Should not allow a quiz to be posted if it\'s missing a quiz type', (done) => {
      chai.request(app)
        .post('/api/v1/quizzes')
        .send({
          name: 'Mid Mod Quiz',
          subject: 'Javascript',
        })
        .end((err, res) => {
          should.exist(err);
          should.exist(res);
          res.status.should.equal(422);
          res.res.should.have.property('statusMessage');
          res.res.statusMessage.should.equal('Unprocessable Entity');
          res.body.should.have.property('error');
          res.body.error.should.equal('You are missing the quiz type!');
          done();
        });
    });
  });

  describe('PATCH api/v1/quizzes/:id', () => {
    it('Should return the quiz\'s ID if an existing quiz is updated', (done) => {
      chai.request(app)
        .get('/api/v1/quizzes')
        .end((err, res) => {
          const id = res.body[0].id;

          chai.request(app)
            .patch(`/api/v1/quizzes/${id}`)
            .send({
              name: 'New Quiz 17986',
            })
            .end((err1, res1) => {
              should.not.exist(err);
              res1.status.should.equal(201);
              res1.should.be.json; //eslint-disable-line
              res1.body.should.be.a('object');
              res1.body.should.have.property('id');
              res1.body.id.should.be.a('number');
              res1.body.id.should.equal(id);
              done();
            });
        });
    });

    it('Should update the property of the quiz that is sent in the request', (done) => {
      chai.request(app)
        .get('/api/v1/quizzes')
        .end((err, res) => {
          const id = res.body[0].id;

          res.body[0].name.should.equal('First Quiz');
          res.body[0].subject.should.equal('Javascript');
          res.body[0].type.should.equal('Pop Quiz');

          chai.request(app)
            .patch(`/api/v1/quizzes/${id}`)
            .send({
              name: 'New Quiz 17986',
            })
            .end((err1, res1) => {
              should.not.exist(err);
              res1.status.should.equal(201);

              chai.request(app)
                .get('/api/v1/quizzes')
                .end((err2, res2) => {
                  res2.body[0].name.should.equal('New Quiz 17986');
                  done();
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

  describe('DELETE /api/v1/quizzes/:id', () => {
    it('Should return a success message and an object containing the quiz that was deleted', (done) => {
      chai.request(app)
        .get('/api/v1/quizzes')
        .end((err, res) => {
          const id = res.body[0].id;

          res.body[0].name.should.equal('First Quiz');
          res.body[0].subject.should.equal('Javascript');
          res.body[0].type.should.equal('Pop Quiz');

          chai.request(app)
            .delete(`/api/v1/quizzes/${id}`)
            .end((err1, res1) => {
              res1.body.should.have.property('success');
              res1.body.success.should.equal(`Quiz #${id} was deleted.`);
              res1.body.should.have.property('deletedQuiz');
              res1.body.deletedQuiz.should.be.a('array');
              res1.body.deletedQuiz[0].id.should.equal(id);
              res1.body.deletedQuiz[0].name.should.equal('First Quiz');
              res1.body.deletedQuiz[0].subject.should.equal('Javascript');
              res1.body.deletedQuiz[0].type.should.equal('Pop Quiz');
              done();
            });
        });
    });

    it('SAD PATH - Should return an error if the quiz does not exist', (done) => {
      chai.request(app)
        .delete('/api/v1/quizzes/0')
        .end((err, res) => {
          should.exist(res);
          res.status.should.equal(404);
          res.should.be.json; //eslint-disable-line
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.equal('The quiz with ID# 0 was not found and could not be deleted');
          done();
        });
    });
  });
});
