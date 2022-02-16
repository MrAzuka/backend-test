import express, { Router } from "express";
import requiresSignIn from "../middlewares/auth/requiresSignIn";
import requiresAdminOrClient from "../middlewares/auth/requiresAdminOrClient";
import markFiles from "../controller/admin/markFiles";
import fetchAllFiles from "../controller/admin/fetchAllFiles";
import joiMiddleware from "../middlewares/joiMiddleware";
import { adminValidator } from "../validators/adminValidator";

const adminRoutes: Router = express.Router();

/**
 * @routes Admin Routes
 */
adminRoutes.use(requiresSignIn, requiresAdminOrClient("admin"));

adminRoutes.put("/markFiles", joiMiddleware(adminValidator), markFiles);

adminRoutes.get("/fetchFiles", fetchAllFiles);

export default adminRoutes;
