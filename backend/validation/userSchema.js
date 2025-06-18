const Joi = require("joi");

const userSchema = Joi.object({
  userId: Joi.string().required(),
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  profilePicture: Joi.string().uri().optional(),
  accessToken: Joi.string().optional(),
  refreshToken: Joi.string().optional(),
  lastSyncedAt: Joi.date().optional(),
});

module.exports = userSchema;
