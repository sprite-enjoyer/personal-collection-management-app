import { Router } from "express";
import { registerUserHandler } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post("/register", registerUserHandler);

export default userRouter;
