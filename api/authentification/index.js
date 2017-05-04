/*
Public Endpoint

/login
-> Request body should contain an arbitrary username/password pair
-> Treat it as a mock authentication service and accept any username/password.
-> Return a signed Json Web Token(JWT, https://jwt.io/) which can be used to validate future requests.
*/
const AuthentificationHandler = require('./handlers');
const TokenManager = require('./TokenManager');
const Joi = require('joi');

// using plugins for project's organization because it allows easy refactoring if needed
// while adding little to no overload to code readability and writing efficiency
exports.register = (server, options, next) => {

  // setup handler
  const tokenManager = new TokenManager(options);
  const authentificationHandler = new AuthentificationHandler(tokenManager);

  server.route([
    {
      method: 'POST',
      path: '/token',
      config: authentificationHandler.getJwtToken()
    }
  ]);

  server.expose({ authentificationHandler });
  server.expose({ tokenManager });

  next();
};

exports.register.attributes = {
  pkg: {
    name: 'authentification'
  }
};
