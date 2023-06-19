import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routers/userRouter.js";
dotenv.config();
const PORT = 3000;
const app = express();
app.use(cors({
    origin: (o, c) => validateOrigin(o ?? "", c),
    credentials: true,
}));
app.use(express.json());
app.use("/users", userRouter);
const validateOrigin = (origin, callback) => {
    console.log(origin);
    if (!origin || origin === "")
        return callback(null, true);
    return callback(null, true);
};
app.listen(PORT, () => {
    console.log("server started at port:", PORT + "!");
    mongoose.connect(process.env.MONGO_URL ?? "").then(async () => {
        console.log("mongoose connection estabilished.");
    });
});
