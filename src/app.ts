import express, { Request, Response } from "express";
import multer from "multer";
import fs from "fs";

const server = express();
const PORT = 5555; //PORT SETTING
server.use(express.json());

const checkDir = () => {
  if (fs.existsSync("folder")) return;
  else fs.mkdirSync("folder");
};

const m = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "folder/");
    },
    filename: function (req, file, cb) {
      console.log(req, file, cb);
      cb(null, Date.now() + file.originalname);
    },
  }),
});

server.post("/upload", m.array("image", 5), (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];
  for (const i in files) {
    console.log(files[i]);
  }
  res.send(true);
});

server.listen(PORT, () => {
  checkDir();
  console.log("server on", PORT);
});
