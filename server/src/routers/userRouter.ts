import { Router } from "express";
import {
  checkUserJwtHandler,
  deleteUsersHandler,
  getUserById,
  getUserByUserName,
  getUsersHandler,
  logInUserHandler,
  putUsersHandler,
  registerUserHandler,
  sendUserJwtHandler,
  signOutHandler,
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", getUsersHandler);
userRouter.get("/getUserById/:id", getUserById);
userRouter.get("/getUserByUserName/:userName", getUserByUserName);
userRouter.get("/signOut", signOutHandler);

userRouter.post("/register", registerUserHandler);
userRouter.post("/login", logInUserHandler, sendUserJwtHandler);
userRouter.post("/checkJWT", checkUserJwtHandler);

userRouter.put("/put", putUsersHandler);

userRouter.delete("/delete", deleteUsersHandler);

export default userRouter;
