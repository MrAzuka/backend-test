import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtExpiresIn, jwtSecret, bcryptSalt } from "../../config";
import User from "../../model/userModel";

export const generateHashedValue = (value: string): string => {
  return bcrypt.hashSync(value, bcryptSalt);
};

export const checkValidity = (value: string, compareValue: string): boolean => {
  return bcrypt.compareSync(value, compareValue);
};

export interface IJWToken {
  token: string;
  expiresAt: number;
}

export const createAccessToken = (id: number): IJWToken => {
  const _id = `${id}`;
  const token: string = jwt.sign({ _id }, jwtSecret, {
    expiresIn: jwtExpiresIn
  });

  const expiresAt: number =
    (jwt.verify(token, jwtSecret) as JwtPayload).exp || Date.now();

  return { token, expiresAt };
};

interface IBasicUser {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  emailAddress: string;
}

export const getBasicUserDetails = (user: User): IBasicUser => {
  const { id, firstName, role, lastName, emailAddress } = user;

  return {
    id,
    firstName,
    lastName,
    role,
    emailAddress
  };
};
