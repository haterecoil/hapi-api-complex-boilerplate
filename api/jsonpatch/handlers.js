const Joi = require('joi');
const Boom = require('boom');
const jsonpatch = require('fast-json-patch');

class JsonpatchHandler {
  static getPatchHandler() {
    // key 'patches' also accepts a single object (as SC stated in the specs)
    const requestSchema = Joi.object().keys({
      jsonToPatch: Joi
        .object()
        .required()
        .min(1)
        .description('A JSON object to patch'),
      patches: Joi
        .array()
        .items(
          Joi.object()
            .required()
            .min(1))
        .single()
        .required()
        .description('An array of valid JSON patches')
    });
    return {
      validate: {
        payload: requestSchema,
        headers: Joi.object({ authorization: Joi.string().required() }).unknown()
      },
      handler(request, reply){
        try {
          reply(
            JsonpatchHandler.patch(request.payload.jsonToPatch, request.payload.patches)
          );
        } catch (err) {
          reply(Boom.badRequest());
        }
      }
    };
  }

  /**
   * Both modifies and returns the jsonToPatch
   * @param jsonToPatch
   * @param patches
   * @returns {*}
   */
  static patch(jsonToPatch, patches) {
    const validate = patches.length > 1000;
    jsonpatch.apply(jsonToPatch, patches, validate);
    // jsonpatch.apply modifies the jsonToPatch object, but for convenience we can juste
    // return the value
    return jsonToPatch;
  }
}

module.exports = JsonpatchHandler;
