import { Request, Response, NextFunction } from "express";
import logger from "../../utils/logger";
import formatLog from "../../utils/logger/formatLog";
import { successResponse } from "../../utils/responses";
import User from "../../model/userModel";
import ApiError from "../../middlewares/errorHandler/ApiError";
import { checkValidity } from "../../utils/helpers/auth";
import { getBasicUserDetails } from "../../utils/helpers/auth";
import { createAccessToken } from "../../utils/helpers/auth";

const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { emailAddress, password } = req.body;
  try {
    logger.info(formatLog(req, "START: Registering a user"));
    const user = await User.findOne({
      where: { emailAddress: emailAddress }
    });
    if (!user) return next(ApiError.badRequest("User does not exist"));

    if (!checkValidity(password, user.password))
      return next(ApiError.badRequest("Password is not correct"));

    logger.info(formatLog(req, "END: Login User Service"));
    return successResponse(res, 200, "Successfully logged in user", {
      user: getBasicUserDetails(user),
      jwt: createAccessToken(user.id)
    });
  } catch (err) {
    next(err);
  }
};

export default login;
