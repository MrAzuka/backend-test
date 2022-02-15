import express, { Router } from "express";
import requiresSignIn from "../middlewares/auth/requiresSignIn";
import requiresAdminOrClient from "../middlewares/auth/requiresAdminOrClient";
import markFiles from "../controller/admin/markFiles";
import fetchAllFiles from "../controller/admin/fetchAllFiles";

const adminRoutes: Router = express.Router();

adminRoutes.use(requiresSignIn, requiresAdminOrClient);

adminRoutes.post("/markFiles", markFiles);

adminRoutes.get("/fetchFiles", fetchAllFiles);

export default adminRoutes;
