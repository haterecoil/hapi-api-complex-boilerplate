/*
 Public Endpoint

 /login
 -> Request body should contain an arbitrary username/password pair
 -> Treat it as a mock authentication service and accept any username/password.
 -> Return a signed Json Web Token(JWT, https://jwt.io/) which can be used to validate future requests.
 */
const AuthentificationHandler = require('./handlers');
const TokenManager = require('./lib/TokenManager');

exports.register = (server, options, next) => {

  // setup handler
  const tokenManager = new TokenManager(options);
  const authentificationHandler = new AuthentificationHandler(tokenManager);

  server.route([
    {
      method: 'POST',
      path: '/token',
      config: Object.assign({}, {
        tags: ['api'],
        description: 'Provides a JWT',
        notes: 'Any username/password combination is okay',
        auth: false, },
        authentificationHandler.getJwtToken())
    }
  ]);

  server.expose({ authentificationHandler });
  server.expose({ tokenManager });

  server.log(['info', 'registration'], 'registered authentification app');

  next();
};

exports.register.attributes = {
  pkg: {
    name: 'authentification'
  }
};
