import Joi from "joi";
import {
  emailAddress,
  role,
  firstName,
  lastName,
  password
} from "./globalSchemas";

export const signupValidator = Joi.object({
  emailAddress,
  firstName,
  lastName,
  password,
  role
});

export const loginValidator = Joi.object({
  emailAddress,
  password
});
