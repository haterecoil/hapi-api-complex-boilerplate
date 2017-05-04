/**
 * Created by moka on 04/05/2017.
 */

const AuthentificationHandler = function (tokenManager) {
  if (typeof tokenManager === 'undefined') {
    throw Error('No token manager was provided !');
  }
  if (typeof tokenManager.createTokenForId === 'undefined') {
    throw Error('No token creation method !');
  }
  this.tokenManager = tokenManager;
};

AuthentificationHandler.prototype.getJwtToken = function() {
  const tokenManager = this.tokenManager;
  return {
    handler(request, reply) {
      // todo check username and password in request
      const mockId = 1;
      const token = tokenManager.createTokenForId(mockId);
      reply({ token });
    }
  };
};

module.exports = AuthentificationHandler;

// todo: add a refresh and renewal strategy
