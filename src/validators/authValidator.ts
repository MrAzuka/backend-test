import Joi from "joi";
import { emailAddress, firstName, lastName, password } from "./globalSchemas";

export const signupValidator = Joi.object({
  emailAddress,
  firstName,
  lastName,
  password
});

export const loginValidator = Joi.object({
  emailAddress,
  password
});
