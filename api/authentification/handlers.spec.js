/**
 * Created by moka on 04/05/2017.
 */
const Lab = require('lab');
const should = require('chai');
const Server = require('../../server');

// init lab
const lab = Lab.script();
exports.lab = lab;

// init chai's should
should.should();

// tests
lab.test('server should', (done) => {
  const operation = 1 + 1;
  operation.should.equal(2);
  done();
});
