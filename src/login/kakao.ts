import express, { Request, Response } from "express";

const router = express.Router();

router.post("/", (req: Request, res: Response) => {
  console.log(req.body);
  res.send({
    result: true,
  });
});

export default router;
