/*
 Protected Endpoint

 /json/patch
 -> Request body should contain a JSON object and a JSON patch object (http://jsonpatch.com/).
 -> Apply the json patch to the json object, and return the resulting json object.

 */
const ImageResize = require('./handlers');

exports.register = (server, options, next) => {
  server.route([
    {
      method: 'POST',
      path: '/image/thumbnail',
      config: Object.assign({}, {
        tags: ['api'],
        description: 'Resizes an image at 50px',
        notes: 'Needs a public image URI',
        plugins: {
          'hapi-swagger': {
            produces: ['image']
          }
        }
      },
      ImageResize.getThumbnailHandler())
    }
  ]);

  server.log(['info', 'registration'], 'registered imageresize app');

  next();
};

exports.register.attributes = {
  pkg: {
    name: 'imageresize'
  }
};
