import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import config from "dotenv";
import uploadRouter from "./fileupload/upload.js";
import loginRouter from "./login/router.js";
import userRouter from "./mysql/userSample.js";
import { body, validationResult } from "express-validator";

config.config();
const server = express();
const PORT = 5555; //PORT SETTING
server.use(express.json());
server.use(morgan("short"));

server.use("/upload", uploadRouter);
server.use("/login", loginRouter);
server.use("/user", userRouter);
const validate = (schemas: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(schemas.map((schema: any) => schema.run(req)));

    const result = validationResult(req);
    if (result.isEmpty()) {
      return next();
    }

    const errors = result.array();
    return res.send(errors);
  };
};
const props = (columnsData: string[]) => {
  return columnsData.map((coulmn: string) => {
    return body(coulmn, `${coulmn} is empty`).notEmpty();
  });
};

server.post("/ping", (req: Request, res: Response) => {
  res.send("pong!");
});

server.post(
  "/validate",
  validate(props(["writer", "price", "title"])),
  (req: Request, res: Response) => {
    // console.log(req.body);
    res.send("pass validate!");
  }
);

server.listen(PORT, () => {
  // checkDir();
  console.log("server on", PORT);
});
