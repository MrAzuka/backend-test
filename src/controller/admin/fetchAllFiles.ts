import { Request, Response, NextFunction } from "express";
import logger from "../../utils/logger";
import formatLog from "../../utils/logger/formatLog";
import { successResponse } from "../../utils/responses";
import File from "../../model/fileModel";

const fetchAllFiles = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    logger.info(formatLog(req, "Fetch All Files "));
    const files = await File.findAll();
    logger.info(formatLog(req, "Successfully fetched all files as unsafe "));
    return successResponse(
      res,
      200,
      "Successfully fetched all files as unsafe",
      files
    );
  } catch (err) {
    next(err);
  }
};

export default fetchAllFiles;
