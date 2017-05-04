/**
 * Created by moka on 04/05/2017.
 */
const Hapi = require('hapi');
const Lab = require('lab');
const Boom = require('boom');
const expect = require('chai').expect;
const plugin = require('../');
// init lab
const lab = Lab.script();
exports.lab = lab;

// tests
lab.experiment('Plugin registration', () => {

  lab.test('Plugin should cause no error on register', (done) => {
    const server = new Hapi.Server({ debug: false });
    server.connection();

    server.register(
      plugin,
      (err) => {
        expect(err).to.not.exist;
        done();
      });
  });
});

lab.experiment('/token route', () => {

  const server = new Hapi.Server({ debug: false });

  lab.before((done) => {
    server.connection();

    server.register({
      register: plugin,
      options: {
        expiresIn: '180h',
        secret: 'testSecret'
      }
    }, (err) => {
      expect(err).to.not.exist;
      done();
    });
  });

  lab.test('/token should not accept requests without username and passord', (done) => {
    server.inject({
      url: '/token',
      method: 'POST'
    }, (res) => {
      expect(res.statusCode).to.equal(400);
      done();
    });
  });
  lab.test('/token should not accept requests with bad username', (done) => {
    server.inject({
      url: '/token',
      method: 'POST',
      payload: {
        username: 1
      }
    }, (res) => {
      expect(res.statusCode).to.equal(400);
      done()
    });
  });
  lab.test('/token should not accept requests with bad passord', (done) => {
    server.inject({
      url: '/token',
      method: 'POST',
      payload: {
        password: 1
      }
    }, (res) => {
      expect(res.statusCode).to.equal(400);
      done();
    });
  });

  lab.test('/token should accept request with username and password', (done) => {
    server.inject({
      url: '/token?username=""&password=""',
      method: 'POST',
      payload: {
        username: '',
        password: ''
      }
    }, (res) => {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});

