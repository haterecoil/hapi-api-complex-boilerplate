/**
 * Created by moka on 04/05/2017.
 */
const Lab = require('lab');
const should = require('chai');

const lab = Lab.script();
exports.lab = lab;

should.should();

lab.test('returns true when 1 + 1 equals 2', (done) => {
  const operation = 1 + 1;
  operation.should.equal(2);
  done();
});
