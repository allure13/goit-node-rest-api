import multer from "multer";
import path from "node:path";
import crypto from "node:crypto";
import Jimp from "jimp";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.resolve("tmp"));
  },
  filename(req, file, cb) {
    const extname = path.extname(file.originalname);
    const basename = path.basename(file.originalname, extname);
    const suffix = crypto.randomUUID();
    const filename = `${basename}-${suffix}${extname}`;

    cb(null, filename);
  },
});

const uploadAvatarMiddleware = multer({ storage });

const optimazeAvatarMiddleware = async (req, res, next) => {
  try {
    const avatar = await Jimp.read(req.file.path);
    avatar.resize(250, 250).quality(60).write(req.file.path);
    next();
  } catch (error) {
    next(error);
  }
};

export { uploadAvatarMiddleware, optimazeAvatarMiddleware };
