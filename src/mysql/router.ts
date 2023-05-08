import fs from "fs";
import express, { Request, Response } from "express";
import userSample from "./userSample";

const router = express.Router();

router.use("/user", userSample);

export default router;
