import express, { NextFunction, Request, Response } from "express";
import multer from "multer";
import fs from "fs";
// import { checkDir, m } from "./fileupload/upload";

import uploadRouter from "./fileupload/upload.js";
import loginRouter from "./login/router.js";
import { body, validationResult } from "express-validator";

const server = express();
const router = express.Router();
const PORT = 5555; //PORT SETTING
server.use(express.json());

server.use("/upload", uploadRouter);
server.use("/login", loginRouter);

const validate = [
  body("name", "이름없음").notEmpty(),
  body("price", "가격없음").notEmpty(),
];

const errhandle = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ message: errors.array()[0].msg });
};

server.post(
  "/ping",
  validate,
  errhandle,
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req).array();

    if (errors.length) {
      res.send(errors);
      return;
    }
    next();
  },
  (req: Request, res: Response) => {
    res.send("pong!");
  }
);

server.listen(PORT, () => {
  // checkDir();
  console.log("server on", PORT);
});
