import express, { Router } from "express";
import requiresSignIn from "../middlewares/auth/requiresSignIn";
import requiresAdminOrClient from "../middlewares/auth/requiresAdminOrClient";
import markFiles from "../controller/admin/markFiles";
import fetchAllFiles from "../controller/admin/fetchAllFiles";
import joiMiddleware from "../middlewares/joiMiddleware";
import { keys } from "../validators/adminValidator";

const adminRoutes: Router = express.Router();

adminRoutes.use(requiresSignIn, requiresAdminOrClient("admin"));

adminRoutes.post("/markFiles", joiMiddleware(keys), markFiles);

adminRoutes.get("/fetchFiles", fetchAllFiles);

export default adminRoutes;
