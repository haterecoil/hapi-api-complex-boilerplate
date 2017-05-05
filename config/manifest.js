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
      jwtSecret: 'manifestSecret'
    },
    production: {
      serverHost: process.env.SERVER_HOST,
      serverPort: process.env.SERVER_PORT,
      jwtExpiresIn: process.env.JWT_EXPIRES_IN,
      jwtSecret: process.env.JWT_SECRET_KEY
    }
  };
  return configuration[env][key];
};

const manifest = {
  connections: [{
    host: envKey('serverHost'),
    port: envKey('serverPort'),
    routes: {
      cors: true
    },
    router: {
      stripTrailingSlash: true
    }
  }],
  registrations: [
    {
      plugin: {
        register: 'good',
        options: {
          reporters: {
            console: [
              {
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{ response: '*', log: '*' }]
              },
              {
                module: 'good-console'
              },
              'stdout'
            ]
          }
        }
      }
    },
    {
      plugin: 'inert'
    },
    {
      plugin: 'vision'
    },
    {
      plugin: {
        register: 'hapi-swagger',
        options: {
          info: {
            title: 'An API with JWT authentification to resize images and patch JSONs',
            version: '0.1',
            contact: {
              name: 'Morgan Caron',
              email: 'morgancebe@gmail.com'
            }
          },
          schemes: ['http']
        }
      }
    },
    {
      plugin: {
        register: './middlewares/jwt-auth-strategy',
        options: {
          jwtSecret: envKey('jwtSecret')
        }
      }
    },
    {
      plugin: {
        register: './api/authentification',
        options: {
          expiresIn: envKey('jwtExpiresIn'),
          secret: envKey('jwtSecret')
        }
      }
    },
    {
      plugin: {
        register: './api/jsonpatch'
      }
    }
  ]
};

module.exports = manifest;
