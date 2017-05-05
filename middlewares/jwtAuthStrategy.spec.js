const Hapi = require('hapi');
const Lab = require('lab');
const Boom = require('boom');
const expect = require('chai').expect;

const middleware = require('./jwtAuthStrategy');

// init lab
const lab = Lab.script();
exports.lab = lab;

const server = new Hapi.Server({ debug: false });

lab.test('middleware jwtAuthStrategy should register', (done) => {
  server.connection();

  server.register(
    middleware,
    (err) => {
      expect(err).not.to.exist;
      done();
    }
  );
});

lab.experiment('middleware jwtAuthStrategy', () => {
  lab.before((done) => {
    server.connection();

    server.register(
      middleware,
      (err) => { done();}
    );
  });
});
