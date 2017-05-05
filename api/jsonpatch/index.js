/*
 Protected Endpoint

 /json/patch
 -> Request body should contain a JSON object and a JSON patch object (http://jsonpatch.com/).
 -> Apply the json patch to the json object, and return the resulting json object.

 */
const JsonpatchHandler = require('./handlers');

exports.register = (server, options, next) => {
  server.route([
    {
      method: 'POST',
      path: '/json/patch',
      config: Object.assign({}, {
        tags: ['api'],
        description: 'Patches a JSON',
        notes: 'Need a JSON object and an array of JSON patches http://jsonpatch.com/',
        auth: 'jwt' },
        JsonpatchHandler.getPatchHandler())
    }
  ]);

  server.log(['info', 'registration'], 'registered jsonpatch app');

  next();
};

exports.register.attributes = {
  pkg: {
    name: 'jsonpatch'
  }
};
