import User from "../schemas/User.js";
import { compare, genSalt, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
export const registerUserHandler = async (req, res) => {
    const { userName, email, password, admin } = req.body;
    const existingUser = await User.findOne({ username: userName });
    if (existingUser)
        return res.status(409).json({ success: false });
    const salt = await genSalt(10);
    const passwordHash = await hash(password, salt);
    const newUser = await User.create({ username: userName, email: email, password: passwordHash, isAdmin: !!admin });
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
export const sendUserJwtHandler = async (req, res) => {
    const { userId } = res.locals;
    const secret = process.env.JWT_SECRET;
    const user = await User.findById(userId);
    if (!userId || !secret || !user)
        return res.status(400).json({ message: "token couldn't be created" });
    const token = jwt.sign({ userID: userId, blocked: user.blocked, isAdmin: user.isAdmin }, secret);
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
export const checkUserJwtHandler = (req, res, next) => {
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
    const userInfo = { userID: decoded.userID, blocked: decoded.blocked, isAdmin: decoded.isAdmin };
    if (justCheck)
        return res.status(200).json(userInfo);
    next();
};
export const getUsersHandler = async (req, res) => {
    const users = (await User.find({})).map((u) => {
        const { username, isAdmin, email, password, blocked, collections, _id } = u;
        const publicUser = {
            id: _id,
            userName: username,
            email: email,
            blocked: blocked,
            isAdmin: isAdmin,
            collections: collections,
        };
        return publicUser;
    });
    res.json({ users: users });
};
export const putUsersHandler = async (req, res) => {
    const { blocked, isAdmin, userIDs } = req.body;
    const mongoIDs = userIDs.map((id) => new mongoose.Types.ObjectId(id));
    if (blocked !== null)
        await User.updateMany({ _id: { $in: mongoIDs } }, { blocked: blocked });
    if (isAdmin !== null)
        await User.updateMany({ _id: { $in: mongoIDs } }, { isAdmin: isAdmin });
    return res.status(200).json({ success: true });
};
export const deleteUsersHandler = async (req, res) => {
    const { userIDs } = req.body;
    const mongoIDs = userIDs.map((id) => new mongoose.Types.ObjectId(id));
    await User.deleteMany({ _id: { $in: mongoIDs } });
    return res.status(200).json({ success: true });
};
