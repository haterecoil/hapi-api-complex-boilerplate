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
      serverHost: 'localhost',
      serverPort: 1337,
      jwtExpiresIn: '19h',
      jwtSecret: 'manifestSecret',
    },
    production: {
      serverHost: process.env.SERVER_HOST,
      serverPort: process.env.SERVER_PORT,
      jwtExpiresIn: process.env.JWT_EXPIRES_IN,
      jwtSecret: process.env.JWT_SECRET_KEY,
    },
  };
  return configuration[env][key];
};

const manifest = {
  connections: [{
    host: envKey('serverHost'),
    port: envKey('serverPort'),
    routes: {
      cors: true,
    },
    router: {
      stripTrailingSlash: true,
    },
  }],
  registrations: [
    {
      plugin: './middlewares/jwt-auth-strategy',
    },
    {
      plugin: {
        register: './api/authentification',
        options: {
          expiresIn: envKey('jwtExpiresIn'),
          secret: envKey('jwtSecret'),
        },
      },
    },
  ],
};

module.exports = manifest;
