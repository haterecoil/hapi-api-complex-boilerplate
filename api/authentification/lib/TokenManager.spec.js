/**
 * Created by moka on 04/05/2017.
 */
const Lab = require('lab');
const expect = require('chai').expect;

const TokenManager = require('./TokenManager')
const basicServer = require('./basicServer');

// init lab
const lab = Lab.script();
exports.lab = lab;



lab.test('TokenManager setting should have defaults options', (done) => {
  const tokenManager = new TokenManager();
  expect(tokenManager.config.secret).to.exist;
  expect(tokenManager.config.expiresIn).to.exist;
  done();
});

lab.test('TokenManager setting should be overwritten when custom options are passed', (done) => {
  const options = { expiresIn: '1h', secret: 'swag' };
  const tokenManager = new TokenManager(options);
  expect(tokenManager.config.secret).to.equal(options.secret);
  expect(tokenManager.config.expiresIn).to.equal(options.expiresIn);
  done();
});

lab.test('TokenManager setting should be overwritten when registered', (done) => {
  const tokenManager = basicServer.server.plugins.authentification.tokenManager;
  expect(tokenManager.config.secret).to.equal(basicServer.config.secret);
  expect(tokenManager.config.expiresIn).to.equal(basicServer.config.expiresIn);
  done();
});
