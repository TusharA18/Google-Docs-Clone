import express from "express";
import dotenv from "dotenv";
import connectToDB from "./database/db.js";
import bodyParser from "body-parser";
import cors from "cors";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import documentRouter from "./routes/document.js";

// config
dotenv.config();
connectToDB();
const app = express();
const port = process.env.PORT ?? 5001;
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/documents", documentRouter);

// listen
app.listen(port, () => {
   console.log(`Server running at PORT:${port}`);
});
