const Joi = require("joi");

const expenseSchema = Joi.object({
  user: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  amount: Joi.number().positive().required(),
  currency: Joi.string().valid("NPR", "USD").default("NPR"),
  vendor: Joi.string().required(),
  category: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .optional(),
  description: Joi.string().allow("").optional(),
  source: Joi.string().required(),
  transactionDate: Joi.date().required(),
  emailId: Joi.string().required(),
});

module.exports = expenseSchema;
