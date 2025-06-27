const Joi = require("joi");

const emailLogSchema = Joi.object({
  emailId: Joi.string().required(),
  subject: Joi.string().required(),
  timestamp: Joi.date().required(),
  snippet: Joi.string().optional(),
  isParsed: Joi.boolean().default(false),
});

module.exports = emailLogSchema;
