const jwt = require('hapi-auth-jwt2');

exports.register = (server, options, next) => {

  const validate = (decoded, request, callback) => {
    // todo: real authentification validation should take place here
    return callback(null, true);
  };

  function registerAuth(err) {
    if (err) {
      server.log(['error'], err);
      throw err;
    }

    server.auth.strategy('jwt', 'jwt', true, {
      key: options.jwtSecret,
      validateFunc: validate,
      verifyOptions: { algorithms: ['HS256'] }
    });

    return next();
  }

  server.register(jwt, registerAuth);
};

exports.register.attributes = {
  name: 'auth-jwt',
  version: '1.0.0'
};
