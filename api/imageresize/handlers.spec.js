const Hapi = require('hapi');
const Lab = require('lab');
const expect = require('chai').expect;

const ImageResize = require('./handlers');

// init lab
const lab = Lab.script();
exports.lab = lab;

const server = new Hapi.Server({ debug: false });

lab.test('ImageresizeHandler should have getThumbnailHandler property', (done) => {
  expect(ImageResize).to.have.property('getThumbnailHandler');
  done();
});

lab.experiment('ImageresizeHandler.getThumbnailBufferPromise ', () => {

  lab.test('should throw Invalid URI when url is not valid', (done) => {
    ImageResize.getThumbnailBufferPromise('yolo')
      .catch((err) => {
        expect(err.message).to.have.string('Invalid');
        done();
      });
  });

  lab.test('should reject when buffer fails', (done) => {
    ImageResize.getThumbnailBufferPromise('http://swag.com')
      .catch((err) => {
        expect(err).to.exist;
        done();
      });
  });
});

lab.experiment('ImageresizeHandler.getThumbnailHandler()', () => {
  lab.before((done) => {
    server.connection();

    server.route([
      {
        method: 'POST',
        path: '/image/thumbnail',
        config: Object.assign(
          {},
          { auth: false },
          ImageResize.getThumbnailHandler())
      }
    ]);

    done();
  });

  lab.test('should reject invalid URL schemes', (done) => {
    server.inject({
      url: '/image/thumbnail',
      method: 'POST',
      headers: { authorization: 'mock' },
      payload: { imageUrl: 'ftp://yolo@swag.ftp.com' }
    }, (res) => {
      expect(res.statusCode).to.equal(400);
      done();
    });
  });

  lab.test('should reject non image urls', (done) => {
    server.inject({
      url: '/image/thumbnail',
      method: 'POST',
      headers: { authorization: 'mock' },
      payload: { imageUrl: 'http://swag.com' }
    }, (res) => {
      expect(res.statusCode).to.equal(400);
      done();
    });
  });

  lab.test('should accept image urls', (done) => {
    server.inject({
      url: '/image/thumbnail',
      method: 'POST',
      headers: { authorization: 'mock' },
      payload: { imageUrl: 'http://lorempixel.com/100/100' }
    }, (res) => {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

});
