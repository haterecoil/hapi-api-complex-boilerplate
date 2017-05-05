const Joi = require('joi');
const Boom = require('boom');
const httpRequest = require('request');
const sharp = require('sharp');

class ImageResize {

  /**
   * Returns the thumbnail handler
   * note: tested on Postman, it shows the correct thumbnail.
   * @returns {{validate: {payload: *, headers: *}, handler: (function(*, *))}}
   */
  static getThumbnailHandler() {
    const requestSchema = Joi.object().keys({
      imageUrl: Joi.string().uri({ scheme: ['http', 'https'] }).required()
    }).required();
    return {
      validate: {
        payload: requestSchema, // note: payload should validate a max length to prevent ddos
        headers: Joi.object({ authorization: Joi.string().required() }).unknown()
      },
      handler(request, reply) {
        try {
          ImageResize.getThumbnailBuffer(
            request.payload.imageUrl,
            (buffah) => {
              reply(buffah).type('image/*'); // not the cleanest but it works fine
            });
        } catch (err) {
          reply(Boom.badRequest());
        }
      }
    };
  }

  /**
   * Fetches a raw image from url and resizes it to 50px;
   *
   * Sorry about callback hell, I do not know much yet about streams
   * and hesitated about chosing a promise based request library. Well,
   * ain't so bad !?
   * @param imageUrl string
   * @param callback
   */
  static getThumbnailBuffer(imageUrl, callback) {
    httpRequest
      .defaults({ encoding: null })
      .get(imageUrl, (err, response, buffer) => {
        sharp(buffer).resize(50).toBuffer((sharpErr, sharpData) => {
          if (err) {
            throw sharpErr;
          }
          callback(sharpData);
        });
      });
  }
}

module.exports = ImageResize;
