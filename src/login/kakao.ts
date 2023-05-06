import express, { Request, Response } from "express";

const router = express.Router();

router.post("/", (req: Request, res: Response) => {
  console.log(req.body);
  res.send("www");
});

export default router;
