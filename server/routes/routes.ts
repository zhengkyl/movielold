import express from "express";

import authRoutes from "./auth";
import reviewRoutes from "./review";
import searchRoutes from "./search";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/review", reviewRoutes);
router.use("/search", searchRoutes);

export default router;
