import { Router } from "express";
import { logInUserHandler, registerUserHandler, sendJWT } from "../controllers/user.controller.js";
const userRouter = Router();
userRouter.post("/register", registerUserHandler);
userRouter.post("/login", logInUserHandler, sendJWT);
export default userRouter;
