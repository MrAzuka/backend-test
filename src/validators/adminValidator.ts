import Joi from "joi";

export const keys = Joi.array().items(Joi.string()).required().messages({
  "any.required": "keys are required"
});
