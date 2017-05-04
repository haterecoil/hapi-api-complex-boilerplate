/**
 * Created by moka on 04/05/2017.
 */
const Hapi = require('hapi');
const Lab = require('lab');
const expect = require('chai').expect;
const plugin = require('../');
// init lab
const lab = Lab.script();
exports.lab = lab;

const basicServer = require('./basicServer');

// tests
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

lab.test('/token should return a 200', (done) => {
  const server = new Hapi.Server({ debug: false });
  server.connection();

  server.register({
    register: plugin,
    options: {
      expiresIn: '180h',
      secret: 'testSecret'
    }
  }, (err) => {
    expect(err).to.not.exist;
  });

  server.inject({
    url: '/token',
    method: 'GET'
  }, (res) => {
    expect(res.statusCode, res.payload).not.to.eql(500);
    expect(res.statusCode).to.eql(200);
    done();
  });
});
