const Hapi = require('hapi');
const Lab = require('lab');
const Boom = require('boom');
const expect = require('chai').expect;

const JsonpatchHandler = require('./handlers');

// init lab
const lab = Lab.script();
exports.lab = lab;

const server = new Hapi.Server({ debug: false });

lab.experiment('JsonpatchHandler getPatchHandler', () => {

  lab.before((done) => {

    server.connection();

    server.route([
      {
        method: 'POST',
        path: '/json/patch',
        config: Object.assign(
          {},
          { auth: false },
          JsonpatchHandler.getPatchHandler())
      }
    ]);

    done();
  });

  lab.test('should correctly patch', (done) => {
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
      headers: { authorization: 'mock'},
      payload: { jsonToPatch, patches }
    }, (res) => {
      expect(res.statusCode).to.equal(200);
      expect(res.payload).to.equal(JSON.stringify(expectedResult));
      done();
    });
  });

  lab.test('should throw err when patch fails', (done) => {
    const jsonToPatch = {
      baz: 'qux',
      foo: 'bar'
    };
    const invalidPatches = [
      { op: 'yolo', path: '/baz', value: 'boo' },
      { op: 'swag', path: '/hello', value: ['world'] },
      { op: 'remove', path: '/foo' }
    ];

    server.inject({
      url: '/json/patch',
      method: 'POST',
      headers: { authorization: 'mock'},
      payload: { jsonToPatch, patches: invalidPatches }
    }, (res) => {
      expect(res.statusCode).to.equal(400);
      done();
    });
  });

});

lab.experiment('JsonpatchHandler patch', () => {

  lab.test('should have a getPatchHandler static method', (done) => {
    expect(JsonpatchHandler).to.have.property('getPatchHandler');
    done();
  });

  lab.test('should correctly patch', (done) => {
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

    JsonpatchHandler.patch(jsonToPatch, patches);

    expect(JSON.stringify(jsonToPatch)).to.equal(JSON.stringify(expectedResult));

    done();
  });

  lab.test('should throw err when patch fails', (done) => {
    const jsonToPatch = {
      baz: 'qux',
      foo: 'bar'
    };
    const invalidPatches = [
      { op: 'yolo', path: '/baz', value: 'boo' },
      { op: 'swag', path: '/hello', value: ['world'] },
      { op: 'remove', path: '/foo' }
    ];

    expect(() => {
      return JsonpatchHandler.patch(jsonToPatch, invalidPatches);
    }).to
      .throw();

    done();
  });
});
