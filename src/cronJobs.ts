import * as cron from "node-cron";
import { cronJobSchedule } from "./config";
import File from "./model/fileModel";
import logger from "./utils/logger";
import { deleteMultipleFiles } from "./utils/aws";

const deleteFiles = async () => {
  logger.info("Deleting unsafe files");
  const files = await File.findAll({ where: { status: "unsafe" } });
  const fileKeys = [];
  for (const file of files) {
    fileKeys.push({ Key: String(file) });
  }
  deleteMultipleFiles(fileKeys);
  await File.destroy({ where: { status: "unsafe" } });
  logger.info("Successfully deleted all unsafe files");
};

const cronJobs = cron.schedule(cronJobSchedule, async () => {
  logger.info("Running cron jobs");

  await deleteFiles();
  logger.info("Cron jobs run successfully");
});

export default cronJobs;
