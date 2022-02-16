import { Sequelize } from "sequelize";
import {
  dbName,
  dbPassword,
  dbUsername,
  nodeEnv,
  dbProductionName
} from "../config";
import logger from "../utils/logger";

const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
  host: "localhost",
  dialect: "postgres"
});
// let sequelize: Sequelize;
// if (nodeEnv === "development") {
//   sequelize = new Sequelize(
//     `postgres://${dbUsername}:${dbPassword}@127.0.0.1:5432/${dbName}`
//   );
// } else if (nodeEnv === "production") {
//   sequelize = new Sequelize(
//     `postgres://${dbUsername}:${dbPassword}@127.0.0.1:5432/${dbProductionName}`
//   );
// }

const connectToDB = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    logger.info("Database connection has been established successfully.");
  } catch (error) {
    logger.error("Unable to connect to the database due to: ", error);
  }
};
export { sequelize, connectToDB };
