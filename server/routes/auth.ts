import express from "express";
import { login, register, getUser } from "../controllers/auth";
import isAuth from "../middleware/isAuth";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);

router.get("/", isAuth, getUser);

export default router;
