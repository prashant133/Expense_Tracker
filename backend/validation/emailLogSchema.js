const Joi = require("joi");

const emailLogSchema = Joi.object({
  emailId: Joi.string().required(),
  subject: Joi.string().required(),
  snippet: Joi.string().optional(),
  timestamp: Joi.date().required(),
  isParsed: Joi.boolean().default(false),
});

module.exports = emailLogSchema;
