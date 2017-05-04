const Hapi = require('hapi');
const plugin = require('../index');

// for debug options see: http://hapijs.com/tutorials/logging
const server = new Hapi.Server({ debug: false });
server.connection();

const config = {
  expiresIn: '1h',
  secret: 'testSecret'
};

server.register({
  register: plugin,
  options: {
    expiresIn: config.expiresIn,
    secret: config.secret
  }
});

module.exports = {
  server,
  config
};
