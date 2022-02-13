import express, { Router } from "express";
import login from "../controller/auth/login";
import signup from "../controller/auth/signup";
import joiMiddleware from "../middlewares/joiMiddleware";
import { signupValidator, loginValidator } from "../validators/authValidator";

const authRouter: Router = express.Router();
authRouter.post("/signup", joiMiddleware(signupValidator), signup);
authRouter.post("/login", joiMiddleware(loginValidator), login);

export default authRouter;
