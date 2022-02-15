import { Request, Response, NextFunction } from "express";
import logger from "../../utils/logger";
import formatLog from "../../utils/logger/formatLog";
import { successResponse } from "../../utils/responses";
import File from "../../model/fileModel";
import { Op } from "sequelize";

const markFiles = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    logger.info(formatLog(req, "Mark files as unsafe"));
    const keys: string[] = req.body;
    const files = await File.update(
      { status: "unsafe" },
      { where: { key: { [Op.in]: keys } } }
    );
    logger.info(formatLog(req, "Successfully marked files as unsafe "));
    return successResponse(
      res,
      200,
      "Successfully marked files as unsafe",
      files
    );
  } catch (err) {
    next(err);
  }
};

export default markFiles;
