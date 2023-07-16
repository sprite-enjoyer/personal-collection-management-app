import { Router } from "express";
import { getAllCommentsHandler, getItemCommentsHandler, postCommentHandler, } from "../controllers/comment.controller.js";
const commentRouter = Router();
commentRouter.get("/getAllComments", getAllCommentsHandler);
commentRouter.get("/itemComments/:itemID", getItemCommentsHandler);
commentRouter.post("/new", postCommentHandler);
export default commentRouter;
