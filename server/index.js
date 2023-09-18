import express from "express";
import dotenv from "dotenv";
import connectToDB from "./database/db.js";
import authRouter from "./routes/auth.js";
import fetchDataRouter from "./routes/fetchData.js";
import bodyParser from "body-parser";
import cors from "cors";

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
app.use("/api/fetchData", fetchDataRouter);

// listen
app.listen(port, () => {
   console.log(`Server running at PORT:${port}`);
});
