import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getUser } from "../controllers/user-controller.js";

const router = express.Router();

router.post("/getUser", verifyToken, getUser);

export default router;
