/**
 * Created by moka on 04/05/2017.
 */

const Joi = require('joi');
const Boom = require('boom');

class AuthentificationHandler {
  constructor(tokenManager) {
    if (typeof tokenManager === 'undefined') {
      throw Error('No token manager was provided !');
    }
    if (typeof tokenManager.createTokenForId === 'undefined') {
      throw Error('No token creation method !');
    }
    this.tokenManager = tokenManager;
  }

  getJwtToken() {
    const tokenManager = this.tokenManager;
    const requestSchema = Joi.object().keys({
      username: Joi.string().allow('').required().description('Any string'),
      password: Joi.string().allow('').required().description('Any string')
    });
    return {
      tags: ['api'],
      description: 'Provides a JWT',
      notes: 'Any username/password combination is okay',
      validate: {
        payload: requestSchema
      },
      handler(request, reply) {
        // todo check username and password in request
        const requestValidation = Joi.validate(request.payload, requestSchema);
        if (requestValidation.error) {
          reply(Boom.badRequest('Please provide a valid username and a password'));
        }
        const mockId = 1;
        const token = tokenManager.createTokenForId(mockId);
        reply({ token });
      }
    };
  }
}

module.exports = AuthentificationHandler;

// todo: add a refresh and renewal strategy
