/**
 * Created by moka on 04/05/2017.
 */
const jwt = require('jsonwebtoken');

const TokenManager = function (customConfig) {
  this.config = {
    expiresIn: '18h',
    secret: 'defaultSecret'
  };

  if (customConfig) {
    this.config = Object.assign({}, this.config, customConfig);
  } else {
    // todo: log better
    // todo: use joi to point out important options ?
    console.warn('There are no options');
  }
};

TokenManager.prototype.createTokenForId = function (id) {
  return jwt.sign(
    { id },
    this.config.secret,
    {expiresIn: this.config.expiresIn}
  );
};


module.exports = TokenManager;