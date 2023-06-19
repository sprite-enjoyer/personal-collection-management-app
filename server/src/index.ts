import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routers/userRouter.js";

dotenv.config();
const PORT = 3000;
const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log("server started at port:", PORT + "!");
  mongoose.connect(process.env.MONGO_URL ?? "").then(async () => {
    console.log("mongoose connection estabilished.");
  });
});
