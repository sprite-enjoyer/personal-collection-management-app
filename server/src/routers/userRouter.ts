import { Router } from "express";
import {
  checkUserJwtHandler,
  deleteUsersHandler,
  getUsersHandler,
  logInUserHandler,
  putUsersHandler,
  registerUserHandler,
  sendUserJwtHandler,
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post("/register", registerUserHandler);
userRouter.post("/login", logInUserHandler, sendUserJwtHandler);
userRouter.post("/checkJWT", checkUserJwtHandler);
userRouter.get("/", getUsersHandler);
userRouter.put("/put", putUsersHandler);
userRouter.delete("/delete", deleteUsersHandler);

export default userRouter;
