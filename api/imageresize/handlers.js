const Joi = require('joi');
const Boom = require('boom');
const httpRequest = require('request');
const sharp = require('sharp');

class ImageresizeHandler {

  /**
   * Returns the thumbnail handler
   * note: tested on Postman, it shows the correct thumbnail.
   * @returns {{validate: {payload: *, headers: *}, handler: (function(*, *))}}
   */
  static getThumbnailHandler() {
    const requestSchema = Joi.object().keys({
      imageUrl: Joi.string().uri({ scheme: ['http', 'https'] }).required().description('A valid image uri')
    }).required();
    return {
      validate: {
        payload: requestSchema, // note: payload should validate a max length to prevent ddos
        headers: Joi.object({ authorization: Joi.string().required() }).unknown()
      },
      handler(request, reply) {
        ImageresizeHandler
          .getThumbnailBufferPromise(request.payload.imageUrl)
          .then((data) => {
            reply(data).type('image/*');
          })
          .catch((err) => {
            reply(Boom.badRequest(err.message))
          });
      }
    };
  }

  /**
   * Fetches a raw image from url and resizes it to 50px;
   *
   * @param imageUrl string
   * @param callback
   */
  static getThumbnailBufferPromise(imageUrl) {
    return new Promise((resolve, reject) => {
      // make request
      httpRequest
        .defaults({ encoding: null })
        .get(imageUrl, (err, response, buffer) => {
          if (err) {
            reject(err);
            return;
          }
          // resize image
          resolve(sharp(buffer).resize(50).toBuffer());
        });
    });
  }
}

module.exports = ImageresizeHandler;
