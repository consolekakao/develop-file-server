import express, { Request, Response } from "express";
import multer from "multer";
import fs from "fs";
// import { checkDir, m } from "./fileupload/upload";

import uploadRouter from "./fileupload/upload.js";

const server = express();
const router = express.Router();
const PORT = 5555; //PORT SETTING
server.use(express.json());

server.use("/upload", uploadRouter);

server.get("/ping", (req: Request, res: Response) => {
  res.send("pong!");
});

server.listen(PORT, () => {
  // checkDir();
  console.log("server on", PORT);
});
