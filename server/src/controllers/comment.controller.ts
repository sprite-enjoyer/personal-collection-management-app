import { Request, Response } from "express";
import Comment from "../schemas/Comment.js";
import { io } from "../index.js";

export const getItemCommentsHandler = async (req: Request, res: Response) => {
  const { itemID } = req.params;
  const comments = await Comment.find({ item: itemID });
  if (!comments) return res.status(500).json({ success: false, data: null });
  return res.status(200).json({ success: true, data: comments });
};

export const getAllCommentsHandler = async (req: Request, res: Response) => {
  const comments = await Comment.find({});
  if (!comments) return res.status(500).json({ success: false, data: null });

  return res.status(200).json({ success: true, data: comments });
};

export interface PostCommentHandlerRequestBody {
  item: string;
  author: string;
  text: string;
}

export const postCommentHandler = async (req: Request<any, any, PostCommentHandlerRequestBody>, res: Response) => {
  const { author, text, item } = req.body;
  const newComment = await new Comment({
    item: item,
    author: author,
    text: text,
  }).save();
  if (!newComment) return res.status(500).json({ success: false, data: null });
  io.in(item).emit("new-comment", newComment);
  return res.status(200).json({ success: true, data: newComment });
};
