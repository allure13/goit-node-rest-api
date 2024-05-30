import express from "express";
import validateBody from "../helpers/validateBody.js";
import { emailSchema, usersSchema } from "../schemas/usersSchemas.js";
import {
  current,
  login,
  logout,
  register,
  updateAvatar,
  verify,
  resendVerificationEmail,
} from "../controllers/usersControllers.js";
import { auth } from "../middlewares/auth.js";
import {
  uploadAvatarMiddleware,
  optimazeAvatarMiddleware,
} from "../middlewares/upload.js";

const usersRouter = express.Router();

usersRouter.get("/verify/:verificationToken", verify);
usersRouter.post("/verify", validateBody(emailSchema), resendVerificationEmail);
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
