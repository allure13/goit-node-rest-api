import HttpError from "../helpers/HttpError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const auth = async (req, res, next) => {
  try {
    const [_, token] = req.headers.authorization.split(" ");

    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(id);

    if (user === null || user.token !== token) {
      return next(HttpError(401));
    }

    req.user = user;

    next();
  } catch (error) {
    next(HttpError(401));
  }
};
