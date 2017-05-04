const Hapi = require('hapi');
const Lab = require('lab');
const expect = require('chai').expect;
const plugin = require('../');
// init lab
const lab = Lab.script();
exports.lab = lab;

const TokenManager = require('../TokenManager');
const AuthentificationHandler = require('../handlers');
const basicServer = require('./basicServer');

lab.test('AuthentificationHandler should need a correct TokenManager', (done) => {
  expect(() => {
    new AuthentificationHandler();
  }).to.throw('No token manager was provided !');

  expect(() => {
    new AuthentificationHandler({});
  }).to.throw('No token creation method !');

  done();
});
