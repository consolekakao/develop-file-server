import multer from "multer";
import fs from "fs";
import express, { Request, Response } from "express";
import kakaoLogin from "./kakao.js";

// const server = express();
const router = express.Router();

router.use("/kakao", kakaoLogin);

export default router;
