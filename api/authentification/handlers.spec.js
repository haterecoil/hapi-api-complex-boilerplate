const Lab = require('lab');
const expect = require('chai').expect;

const AuthentificationHandler = require('./handlers');

// init lab
const lab = Lab.script();
exports.lab = lab;

lab.test('AuthentificationHandler should need a correct TokenManager', (done) => {
  expect(() => {
    return new AuthentificationHandler();
  }).to.throw('No token manager was provided !');

  expect(() => {
    return new AuthentificationHandler({});
  }).to.throw('No token creation method !');

  done();
});

lab.test('')

