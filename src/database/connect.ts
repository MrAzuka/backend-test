import { Sequelize } from "sequelize";
import { dbName, dbPassword, dbUsername } from "../config";
import logger from "../utils/logger";

export const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
  host: "localhost",
  dialect: "postgres"
});

export const connectToDB = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    logger.info("Database connection has been established successfully.");
  } catch (error) {
    logger.error("Unable to connect to the database:", error);
  }
};
