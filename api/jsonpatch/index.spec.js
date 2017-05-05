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
  (err) => {});

// tests
lab.experiment('jsonpatch registration', () => {

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

lab.experiment('/json/patch protection', () => {

  lab.test('should unauthorize requests without JWT', (done) => {
    server.inject({
      url: '/json/patch',
      method: 'POST'
    }, (res) => {
      expect(res.statusCode).to.equal(401);
      done();
    });
  });

  lab.test('should not accept invalid JWT', (done) => {
    server.inject({
      url: '/json/patch',
      method: 'POST',
      headers: { authorization: 'wrong' }
    }, (res) => {
      expect(res.statusCode).to.equal(401);
      done();
    });
  });
});

lab.experiment('/json/patch json patching', () => {

  lab.test('should return 400 without all parameters', (done) => {
    server.inject({
      url: '/json/patch',
      method: 'POST',
      headers: { authorization: 'mock' },
      credentials: {
        username: 'swag',
        password: 'swqg'
      }
    }, (res) => {
      expect(res.statusCode).to.equal(400);
      done();
    });
  });
  lab.test('should return 400 without patches', (done) => {
    server.inject({
      url: '/json/patch',
      method: 'POST',
      headers: { authorization: 'mock' },
      credentials: {
        username: 'swag',
        password: 'swqg'
      },
      payload: {
        jsonToPatch: {swag: 'true'}
      }
    }, (res) => {
      expect(res.statusCode).to.equal(400);
      done();
    });
  });

  lab.test('should return 400 without jsonToPath', (done) => {
    server.inject({
      url: '/json/patch',
      method: 'POST',
      headers: { authorization: 'mock' },
      credentials: {
        username: 'swag',
        password: 'swqg'
      },
      payload: {
        patches: []
      }
    }, (res) => {
      expect(res.statusCode).to.equal(400);
      done();
    });
  });

  lab.test('should return correct patched json', (done) => {
    const jsonToPatch = {
      baz: 'qux',
      foo: 'bar'
    };
    const patches = [
      { op: 'replace', path: '/baz', value: 'boo' },
      { op: 'add', path: '/hello', value: ['world'] },
      { op: 'remove', path: '/foo' }
    ];

    const expectedResult = {
      baz: 'boo',
      hello: ['world']
    };

    server.inject({
      url: '/json/patch',
      method: 'POST',
      headers: { authorization: 'mock' },
      credentials: {
        username: 'swag',
        password: 'swqg'
      },
      payload: {
        jsonToPatch,
        patches
      }
    }, (res) => {
      expect(JSON.stringify(res.result)).to.equal(JSON.stringify(expectedResult));
      done();
    });
  });
});
