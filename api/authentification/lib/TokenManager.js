/**
 * Created by moka on 04/05/2017.
 */
const jwt = require('jsonwebtoken');

class TokenManager {
  constructor(customConfig) {
    this.config = {
      expiresIn: '18h',
      secret: 'defaultSecret'
    };

    if (customConfig) {
      this.config = Object.assign({}, this.config, customConfig);
    } else {
      // todo: use joi to point out important options ?
    }
  }

  createTokenForId(id) {
    console.log(this.config.secret);
    return jwt.sign(
      { id },
      this.config.secret,
      { expiresIn: this.config.expiresIn }
    );
  }
}

module.exports = TokenManager;
