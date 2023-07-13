import dotenv from "dotenv";
import express from "express";
import cors, { CorsOptions } from "cors";
import mongoose from "mongoose";
import userRouter from "./routers/userRouter.js";
import collectionRouter from "./routers/collectionRouter.js";
import itemRouter from "./routers/itemRouter.js";
import commentRouter from "./routers/commentRouter.js";
import http from "http";
import { Server } from "socket.io";

const corsOptions: CorsOptions = {
  origin: (o, c) => validateOrigin(o ?? "", c),
  credentials: true,
};

const app = express();
const server = http.createServer(app);
export const io = new Server(server, { cors: corsOptions });

dotenv.config();
const PORT = 3000;

app.use(cors(corsOptions));

app.use(express.json());
app.use("/users", userRouter);
app.use("/collections", collectionRouter);
app.use("/items", itemRouter);
app.use("/comments", commentRouter);

const validateOrigin = (origin: string, callback: (err: Error | null, origin?: boolean) => void) => {
  if (!origin || origin === "") return callback(null, true);
  return callback(null, true);
};

server.listen(PORT, () => {
  mongoose.connect(process.env.MONGO_URL ?? "").then(async () => {
    console.log("Server started; Mongoose connection estabilished. Server port:", PORT);
  });
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomID: string) => {
    socket.join(roomID);
    socket.on("leave-room", (roomID: string) => {
      socket.leave(roomID);
    });
  });
});
