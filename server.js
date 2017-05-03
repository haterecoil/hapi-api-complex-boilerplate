/**
 * File exectued on npm start, it starts the server on options defiend in /config/manifest
 */

// Glue could seem overkill but it is nice to keep all server configuration in a file
const Glue = require('glue');

const manifest = require('./config/manifest');

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  manifest.registrations.push({
    plugin: {
      register: 'blipp',
    },
  });
}

Glue.compose(manifest, { relativeTo: __dirname }, (err, server) => {
  if (err) {
    console.log('server.register err:', err);
  }
  server.start(() => {
    console.log('Server is listening on ', server.info.uri);
  });
});
