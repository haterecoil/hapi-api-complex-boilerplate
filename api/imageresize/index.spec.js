/**
 * Created by moka on 05/05/2017.
 */
const Hapi = require('hapi');
const Lab = require('lab');
const expect = require('chai').expect;
const plugin = require('./index');
const jwtAuth = require('../../middlewares/jwtAuthStrategy');

// init lab
const lab = Lab.script();
exports.lab = lab;

const server = new Hapi.Server({ debug: false });
server.connection();

server.register(
  [jwtAuth, plugin],
  (err) => {
  });

// tests
lab.experiment('imageresize registration', () => {

  lab.test(' should cause no error', (done) => {
    const serverBis = new Hapi.Server({ debug: false });

    serverBis.connection();

    serverBis.register(
      [jwtAuth, plugin],
      (err) => {
        expect(err).to.not.exist;
        done();
      });
  });
});

lab.experiment('/image/thumbnail protection', () => {

  lab.test('should unauthorize requests without JWT', (done) => {
    server.inject({
      url: '/image/thumbnail',
      method: 'POST',
      payload: { imageUrl: 'http://lorempixel.com/100/100' }
    }, (res) => {
      expect(res.statusCode).to.equal(401);
      done();
    });
  });

  lab.test('should not accept invalid JWT', (done) => {
    server.inject({
      url: '/image/thumbnail',
      method: 'POST',
      headers: { authorization: 'wrong' },
      payload: { imageUrl: 'http://lorempixel.com/100/100' }
    }, (res) => {
      expect(res.statusCode).to.equal(401);
      done();
    });
  });
});

lab.experiment('/image/thumbnail routes', () => {

  lab.test('should accept /image/thumbnail', (done) => {
    server.inject({
      url: '/image/thumbnail',
      method: 'POST',
      payload: { imageUrl: 'http://lorempixel.com/100/100' }
    }, (res) => {
      expect(res.statusCode).not.to.equal(404);
      done();
    });
  });

  lab.test('should return an image', (done) => {
    server.inject({
      url: '/image/thumbnail',
      method: 'POST',
      headers: { authorization: 'fake' },
      credentials: { username: 'a', password: 'b' },
      payload: { imageUrl: 'http://lorempixel.com/100/100' }
    }, (res) => {
      expect(res.headers['content-type']).to.have.string('image');
      done();
    });
  });
});
