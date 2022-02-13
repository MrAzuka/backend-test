import Joi from "joi";
import { email, firstName, lastName, password } from "./globalSchemas";

export const signupValidator = Joi.object({
  email,
  firstName,
  lastName,
  password
});

export const loginValidator = Joi.object({
  email,
  password
});
