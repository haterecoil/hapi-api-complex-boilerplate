const jwt = require('hapi-auth-jwt2');

exports.register = (server, options, next) => {

  function validate() {
    // todo: real authentification validation should take place here
    return true;
  }

  function registerAuth(err) {
    if (err) {
      return err;
    }

    server.auth.strategy('jwt', 'jwt', {
      key: process.env.JWT_SECRET_KEY,
      validateFunc: validate,
      verifyOptions: { algorithms: ['HS512'] },
    });

    return next();
  }

  server.register(jwt, registerAuth);
};

exports.register.attributes = {
  name: 'auth-jwt',
  version: '1.0.0',
};
