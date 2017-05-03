/**
 * File exectued on npm start, it starts the server on options defiend in /config/manifest
 */
const Hapi = require('hapi');

const server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: 1337,
});

server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Server is running on', server.info.uri);
});
