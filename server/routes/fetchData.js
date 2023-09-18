import express from "express";
import { verifyToken } from "../middleware/auth.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
   const id = req.user.id;

   try {
      const user = await User.findById(id);

      if (!user) {
         return res.status(403).json({ msg: "User not found" });
      }

      return res.status(200).json({ user });
   } catch (error) {
      res.status(500).json({
         msg: "Internal Server Error",
         error: error.message,
      });
   }
});

export default router;
