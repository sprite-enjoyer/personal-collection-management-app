import User from "../schemas/User.js";
import { compare, genSalt, hash } from "bcrypt";
import jwt from "jsonwebtoken";
export const registerUserHandler = async (req, res) => {
    const { userName, email, password } = req.body;
    const existingUser = await User.findOne({ username: userName });
    if (existingUser)
        return res.status(409).json({ success: false });
    const salt = await genSalt(10);
    const passwordHash = await hash(password, salt);
    const newUser = await User.create({ username: userName, email: email, password: passwordHash });
    return res.status(200).json({ success: true });
};
export const logInUserHandler = async (req, res, next) => {
    const { userName, password } = req.body;
    const user = await User.findOne({ username: userName });
    const hashedPassword = user?.password;
    if (!hashedPassword)
        return res.status(500).json({ success: false });
    const equal = await compare(password, hashedPassword);
    if (!equal)
        return res.status(401).json({ success: false });
    res.locals.userId = user._id;
    next();
};
export const sendJWT = async (req, res) => {
    const { userId } = res.locals;
    const secret = process.env.JWT_SECRET;
    const user = await User.findById(userId);
    if (!userId || !secret || !user)
        return res.status(400).json({ message: "token couldn't be created" });
    const token = jwt.sign({ userID: userId, blocked: user.blocked }, secret);
    const date = new Date();
    date.setTime(date.getTime() + 24 * 60 * 60 * 1000);
    return res
        .cookie("jwt", token, {
        maxAge: 24 * 60 * 60 * 1000,
        secure: true,
        httpOnly: true,
        expires: date,
        sameSite: "none",
        path: "/",
    })
        .status(200)
        .json({ success: true, userName: user.username });
};
export const checkJWT = (req, res, next) => {
    const { justCheck } = req.body;
    const secret = process.env.JWT_SECRET;
    if (!secret)
        return res.status(500).json({ message: "no jwt secret defined in server" });
    const token = req.headers.cookie?.slice(4) ?? null;
    if (!token) {
        const userInfo = { userID: null, blocked: false };
        if (justCheck)
            return res.status(401).json(userInfo);
        res.locals.userInfo = { ...userInfo };
        next();
        return;
    }
    const decoded = jwt.verify(token, secret);
    const userInfo = { userID: decoded.userID, blocked: decoded.blocked };
    if (justCheck)
        return res.status(200).json(userInfo);
    next();
};
