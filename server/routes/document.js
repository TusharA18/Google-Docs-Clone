import express from "express";
import { createDocument } from "../controllers/document-controller.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/createDocument", verifyToken, createDocument);

export default router;
