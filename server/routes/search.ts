import express from "express";
import { query } from "express-validator";

import isAuth from "../middleware/isAuth";
import { getMovies } from "../controllers/search";

const router = express.Router();

router.get(
  "/",
  query("query").exists().isString(),
  query("page").optional().isInt(),
  getMovies
);

router.use("/", isAuth); // Authenticated routes below

// router.post("/", createReview);
// router.put("/:id", updateReview);
// router.delete("/:id", deleteReview);

export default router;
