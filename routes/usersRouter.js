import express from "express";
import validateBody from "../helpers/validateBody.js";
import { usersSchema } from "../schemas/usersSchemas.js";
import {
  current,
  login,
  logout,
  register,
  updateAvatar,
} from "../controllers/usersControllers.js";
import { auth } from "../middlewares/auth.js";
import {
  uploadAvatarMiddleware,
  optimazeAvatarMiddleware,
} from "../middlewares/upload.js";

const usersRouter = express.Router();

usersRouter.post("/register", validateBody(usersSchema), register);
usersRouter.post("/login", validateBody(usersSchema), login);
usersRouter.post("/logout", auth, logout);
usersRouter.get("/current", auth, current);
usersRouter.patch(
  "/avatars",
  auth,
  uploadAvatarMiddleware.single("avatar"),
  optimazeAvatarMiddleware,
  updateAvatar
);

export default usersRouter;
