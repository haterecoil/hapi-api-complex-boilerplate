/**
 * Created by moka on 04/05/2017.
 */
const jwt = require('jsonwebtoken');

module.exports = (function (customConfig) {
  let config = {
    expiresIn: '18h',
    secret: 'mockSecret',
  };

  console.log(JSON.stringify(config));
  console.log(JSON.stringify(customConfig));

  if (customConfig) {
    config = Object.assign({}, config, customConfig);
  } else {
    // todo: log better
    // todo: use joi to point out important options ?
    console.warn('There are no options');
  }

  console.log(JSON.stringify(config));

  const Token = function () {
  };

  Token.prototype.createForId = function (id) {
    return jwt.sign(
      { id },
      { secret: config.secret },
      { expiresIn: config.expiresIn }
    );
  };

  return new Token();
});
