import express from "express";

import {
  createReview,
  updateReview,
  deleteReview,
  getReviews,
} from "../controllers/review";

import isAuth from "../middleware/isAuth";

const router = express.Router();


router.get("/", getReviews);

router.use("/", isAuth); // Authenticated routes below

router.post("/", createReview);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);

export default router;
