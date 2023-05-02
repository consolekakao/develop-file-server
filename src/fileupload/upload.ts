import multer from "multer";
import fs from "fs";
import express, { Request, Response } from "express";

// const server = express();
const router = express.Router();

const checkDir = () => {
  if (fs.existsSync("folder")) return;
  else fs.mkdirSync("folder");
};

const m = multer({
  limits: { fieldSize: 5 * 1024 * 1024 },
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "folder/");
    },
    filename: function (req, file, cb) {
      //   console.log(req, file, cb);
      cb(null, Date.now() + file.originalname);
    },
  }),
});

router.post("/", m.array("image", 5), (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];
  for (const value of files) {
    console.log(value);
  }

  res.send(true);
});

export default router;
