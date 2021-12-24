import express from "express";
const router = express.Router();

import {
  createReview,
  updateReview,
  deleteReview,
  getReviews,
} from "../controllers/review.mjs";
import isAuth from "../middleware/isAuth.mjs";

router.post("/", isAuth, createReview);
router.put("/:id", isAuth, updateReview);
router.delete("/:id", isAuth, deleteReview);
router.get("/", isAuth, getReviews);

export default router;
