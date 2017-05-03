/**
 * Handy file gathering options and registrations
 */

/**
 * A helper returning the value of a given key for current environment
 * @param key string
 * @returns {*}
 */
const envKey = (key) => {
  const env = process.env.NODE_ENV || 'development';

  const configuration = {
    development: {
      host: 'localhost',
      port: 1337,
    },
    production: {
      host: process.env.HOST,
      port: process.env.PORT,
    },
  };
  return configuration[env][key];
};

const manifest = {
  connections: [{
    host: envKey('host'),
    port: envKey('port'),
    routes: {
      cors: true,
    },
    router: {
      stripTrailingSlash: true,
    },
  }],
  registrations: [
    {
      plugin: './api',
    },
  ],
};

module.exports = manifest;
