import Joi from "joi";

export const email = Joi.string().required().email().messages({
  "string.email": "Email address is invalid",
  "any.required": "Email address is required"
});

export const password = Joi.string().required().min(8).messages({
  "string.min": "Password must contain at least 8 characters",
  "any.required": "Password is required"
});

export const firstName = Joi.string().required().messages({
  "any.required": "First Name is required"
});
export const lastName = Joi.string().required().messages({
  "any.required": "Last Name is required"
});
