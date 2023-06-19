import { Request, Response } from "express";
import User from "../schemas/User.js";
import { genSalt, hash } from "bcrypt";

export const registerUserHandler = async (req: Request, res: Response) => {
  const { userName, email, password } = req.body;
  const existingUser = await User.findOne({ username: userName });
  if (existingUser) return res.status(409).json({ success: false });

  const salt = await genSalt(10);
  const passwordHash = await hash(password, salt);
  const newUser = await User.create({ username: userName, email: email, password: passwordHash });
  return res.status(200).json({ success: true });
};
