/**
 * Created by moka on 04/05/2017.
 */

const jwt = require('./Token');

module.exports.get_jwt_token = {
  handler(request, reply) {
    const mockId = 1;
    const token = jwt.createTokenForId(mockId);
    reply({ token });
  },
};

// todo: add a refresh and renewal strategy
