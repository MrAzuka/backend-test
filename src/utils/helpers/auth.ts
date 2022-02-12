// import bcrypt from "bcrypt";
// import jwt, { JwtPayload } from "jsonwebtoken";
// import { jwtExpiresIn, jwtSecret, bcryptSalt } from "../../config";

// export const generateHashedValue = (value: string): string => {
//   return bcrypt.hashSync(value, bcryptSalt);
// };

// export const checkValidity = (value: string, compareValue: string): boolean => {
//   return bcrypt.compareSync(value, compareValue);
// };

// export interface IJWToken {
//   token: string;
//   expiresAt: number;
// }

// export const createAccessToken = (id: string): IJWToken => {
//   const token: string = jwt.sign({ id }, jwtSecret, {
//     expiresIn: jwtExpiresIn
//   });

//   const expiresAt: number =
//     (jwt.verify(token, jwtSecret) as JwtPayload).exp || Date.now();

//   return { token, expiresAt };
// };
