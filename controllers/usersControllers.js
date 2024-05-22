import bcrypt, { hash } from "bcrypt";
import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import * as fs from "node:fs/promises";
import path from "node:path";

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (user !== null) {
      throw HttpError(409, "Email in use");
    }

    const avatar = gravatar.url(email, { protocol: "https", size: 200 });
    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hash, avatarURL: avatar });
    res
      .status(201)
      .json({ user: { email, subscription: newUser.subscription, avatarURL: newUser.avatarURL } });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user === null) {
      throw HttpError(401, "Email or password is wrong");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw HttpError(401, "Email or password is wrong");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    await User.findOneAndUpdate({ email }, { token });

    res.json({ token, user: { email, subscription: user.subscription } });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { token: null });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const current = async (req, res, next) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

 export const uploadAvatar = async (req, res, next) => {
  try {
    await fs.rename(req.file.path, path.resolve("public/avatars", req.file.filename));

    const user = await User.findByIdAndUpdate(req.user._id, {avatarURL: req.file.filename}, { new: true },);

    res.send(user);
  } catch (error) {
    next(error);
  }
 }