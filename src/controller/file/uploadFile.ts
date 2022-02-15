import { Request, Response, NextFunction } from "express";
import logger from "../../utils/logger";
import formatLog from "../../utils/logger/formatLog";
import { successResponse } from "../../utils/responses";
import File from "../../model/fileModel";
import { UploadFile } from "../../types/global";

const uploadFile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    logger.info(formatLog(req, "Uploading a file."));
    const userId = Number(res.locals.user.id);
    if ((req.file as Express.Multer.File).fieldname === "file") {
      const images = req.file as Express.Multer.File;
      const [location, key, originalname] = [
        (images as UploadFile).location,
        (images as UploadFile).key,
        (images as UploadFile).originalname
      ];
      const file = await File.create({
        location: location,
        key: key,
        filename: originalname,
        userId: userId
      });

      return successResponse(res, 200, "Successfully Uploaded the File", file);
    }
  } catch (err) {
    next(err);
  }
};

export default uploadFile;
