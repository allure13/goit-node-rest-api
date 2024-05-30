import bcrypt, { hash } from "bcrypt";
import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import * as fs from "node:fs/promises";
import path from "node:path";
import HttpError from "../helpers/HttpError.js";
import mail from "../mail.js";
import crypto from "node:crypto";

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user !== null) {
      throw HttpError(409, "Email in use");
    }

    const avatar = gravatar.url(email, { protocol: "https", size: 200 });
    const hash = await bcrypt.hash(password, 10);
    const verifyToken = crypto.randomUUID();

    const newUser = await User.create({
      email,
      password: hash,
      avatarURL: avatar,
      verifyToken,
    });

    mail.sendMail({
      to: email,
      from: "igor.cheplyaka@meta.ua",
      subject: "Welcome to phonebook!",
      html: `To confirm your email please click on the <a href="http://localhost:3000//users/verify/${verifyToken}">link</a>`,
      text: `o confirm your email please open the link http://localhost:3000//users/verify/${verifyToken}`,
    });

    res.status(201).json({
      user: {
        email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
      },
    });
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

    if (user.verify === false) {
      throw HttpError(401, "please verify your email")
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

export const updateAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded. Try again." });
    }

    const fileName = req.file.filename;
    await fs.rename(req.file.path, path.resolve("public/avatars", fileName));

    const avatarURL = path.join("/avatars", fileName);

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatarURL: avatarURL },
      { new: true }
    );

    res.send(user);
  } catch (error) {
    next(error);
  }
};


export const verify = async (req, res, next) => {
  const {token} = req.params;

try {
  const user = await User.findOneAndUpdate(
    { verifyToken: token },
    { verify: true, verifyToken: null },
    { new: true },
  );
  if (user === null) {
    throw HttpError(404, "User not found!:(");
  }

  res.send({message: "Email confirm succesfully!:)"});

} catch (error) {
  next(error);
}
  
}