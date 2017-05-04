/**
 * Created by moka on 04/05/2017.
 */
const AuthentificationHandler = require('./handlers');
const TokenManager = require('./TokenManager');


// using plugins for project's organization because it allows easy refactoring if needed
// while adding little to no overload to code readability and writing efficiency
exports.register = (server, options, next) => {

  // do Token configuration
  const tokenManager = new TokenManager(options);
  const authentificationHandler = new AuthentificationHandler(tokenManager);

  server.route([
    {
      method: 'GET',
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
