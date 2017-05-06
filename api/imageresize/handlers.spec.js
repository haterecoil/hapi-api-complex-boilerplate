const Lab = require('lab');
const expect = require('chai').expect;

const ImageResize = require('./handlers');

// init lab
const lab = Lab.script();
exports.lab = lab;

lab.test('ImageResize should have getThumbnailHandler property', (done) => {
  expect(ImageResize).to.have.property('getThumbnailHandler');
  done();
});

lab.experiment('ImageResize.getThumbnailBuffer ', () => {
  lab.test('should throw Invalid URI when url is not valid', (done) => {
    expect(() => {
      ImageResize.getThumbnailBuffer('yolo');
    }).to.throw(/Invalid URI/);
    done();
  });

  lab.test('should callback error when buffer fails', (done) => {
    ImageResize.getThumbnailBuffer('http://swag.com', (err, data) => {
      console.log(err);
      console.log(data);
      expect(err).to.exist;
      done();
    });
  });
});

