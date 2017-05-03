/**
 * Created by moka on 04/05/2017.
 */
const Auth = require('./auth/auth');

//   using plugins for project's organization because it allows easy refactoring if needed
// while adding little to no overload to code readability and writing efficiency
exports.register = (plugin, options, next) => {
  plugin.route([
    { method: 'GET', path: '/', config: Auth.index },
  ]);

  next();
};

exports.register.attributes = {
  name: 'api',
};
