import express from "express";
import dotenv from "dotenv";
import connectToDB from "./database/db.js";
import bodyParser from "body-parser";
import cors from "cors";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import documentRouter from "./routes/document.js";
import { Server } from "socket.io";
import Document from "./models/Document.js";

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
const server = app.listen(port, () => {
   console.log(`Server running at PORT:${port}`);
});

// socket
const io = new Server(server, {
   cors: {
      origin: ["http://localhost:3000", process.env.CLIENT_URL],
   },
});

io.on("connection", (socket) => {
   console.log("user connected");

   socket.on("get-document", async (docId) => {
      const doc = await fetchDocument(docId);

      socket.join(docId);

      socket.emit("load-document", doc);

      socket.on("send-changes", (delta) => {
         socket.broadcast.to(docId).emit("receive-changes", delta);
      });

      socket.on("send-name-change", (val) => {
         socket.broadcast.to(docId).emit("receive-name-change", val);
      });

      socket.on("save-changes", async (doc) => {
         await Document.findByIdAndUpdate(docId, doc);
      });
   });

   socket.on("disconnect", () => {
      console.log("user disconnected");
   });
});

// socket function
const fetchDocument = async (id) => {
   if (id == null) {
      return;
   }

   const document = await Document.findById(id);

   return document;
};
