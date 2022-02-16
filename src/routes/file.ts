import express, { Router } from "express";
import upload from "../utils/aws";
import uploadFile from "../controller/file/uploadFile";
import requiresSignIn from "../middlewares/auth/requiresSignIn";
import downloadFile from "../controller/file/downloadFile";

const fileRoutes: Router = express.Router();

/**
 * @routes Media Routes
 */
fileRoutes.post("/upload", requiresSignIn, upload.single("file"), uploadFile);
fileRoutes.get("/download", requiresSignIn, downloadFile);

export default fileRoutes;
