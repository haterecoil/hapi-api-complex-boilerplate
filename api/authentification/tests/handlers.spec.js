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


// tests
lab.test('Plugin should cause no error on register', (done) => {
  const server = new Hapi.Server({ debug: false });
  server.connection();

  server.register(
    plugin,
    (err) => {
      if (err) {
        done(err);
      }
    });

  done();
});

lab.test('Plugin options should be overwritten', (done) => {
  const server = new Hapi.Server({ debug: false });
  server.connection();

  server.register(
    plugin,
    {
      expiresIn: '180h',
      secret: 'override',
    },
    (err) => {
      if (err) {
        done(err);
      }
    });



  done();
});

