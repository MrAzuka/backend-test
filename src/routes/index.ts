import express, { Router } from "express";
import authRoutes from "./auth";
import fileRoutes from "./file";
import adminRoutes from "./admin";

const router: Router = express.Router();

router.use("/auth", authRoutes);
router.use("/file", fileRoutes);
router.use("/admin", adminRoutes);

export default router;
