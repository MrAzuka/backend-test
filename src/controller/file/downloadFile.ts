import { Request, Response, NextFunction } from "express";
import logger from "../../utils/logger";
import formatLog from "../../utils/logger/formatLog";
import { downloadSingleFile } from "../../utils/aws";
import File from "../../model/fileModel";
import ApiError from "../../middlewares/errorHandler/ApiError";

const downloadFile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    logger.info(formatLog(req, "Verifying the file key"));
    const { fileKey } = req.query;
    console.log(fileKey);
    const file = await File.findOne({ where: { key: String(fileKey) } });
    if (!file) return next(new ApiError(401, "No file with key found"));

    await downloadSingleFile(req, res, String(fileKey));
  } catch (err) {
    next(err);
  }
};

export default downloadFile;
