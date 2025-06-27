const Joi = require("joi");

const categorySchema = Joi.object({
  name: Joi.string().required(),
  user: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
});

module.exports = categorySchema;
