import { Router } from "express";
import { checkJWT, logInUserHandler, registerUserHandler, sendJWT } from "../controllers/user.controller.js";
const userRouter = Router();
userRouter.post("/register", registerUserHandler);
userRouter.post("/login", logInUserHandler, sendJWT);
userRouter.post("/checkJWT", checkJWT);
export default userRouter;
