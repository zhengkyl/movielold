import express from "express";
const router = express.Router();

import { login, register, getUser } from "../controllers/auth.mjs";
import isAuth from "../middleware/isAuth.mjs";

router.post("/login", login);
router.post("/register", register);

router.get("/", isAuth, getUser);

export default router;
