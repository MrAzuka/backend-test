import dotenv from "dotenv";

dotenv.config();

export const port = process.env.PORT;
export const nodeEnv = process.env.NODE_ENV;
export const dbName = process.env.DB_NAME || "";
export const dbUsername = process.env.DB_USERNAME || "";
export const dbPassword = process.env.DB_PASSWORD || "";
export const jwtSecret = process.env.JWT_SECRET || "";
export const jwtExpiresIn = Number(process.env.JWT_EXPIRES_IN) || "";
export const bcryptSalt = Number(process.env.BCRYPT_SALT) || "";
export const awsID = process.env.AWS_ACCESS_ID || "";
export const awsKey = process.env.AWS_ACCESS_KEY || "";
export const awsBucket = process.env.AWS_BUCKET_NAME || "";
