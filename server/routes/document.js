import express from "express";
import {
   createDocument,
   deleteDocument,
   fetchDocument,
   getAllDocuments,
   updateDocument,
} from "../controllers/document-controller.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/createDocument", verifyToken, createDocument);

router.post("/getAllDocuments", verifyToken, getAllDocuments);

router.post("/fetchDocument", verifyToken, fetchDocument);

router.put("/updateDocument", verifyToken, updateDocument);

router.delete("/deleteDocument", verifyToken, deleteDocument);

export default router;
