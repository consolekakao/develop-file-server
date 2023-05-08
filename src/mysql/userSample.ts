import express, { NextFunction, Request, Response } from "express";
import { Connection, QueryError, RowDataPacket } from "mysql2";
import { getConnection } from "./mysql.js";
import { body, param, validationResult } from "express-validator";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  console.log(req.query);
  getConnection(async (conn: Connection) => {
    conn.query(
      `select * from users where email="${req.query.email}"`,
      (err: QueryError, rows: RowDataPacket) => {
        if (err)
          throw `[ERROR] MYSQL_USER_GET ${new Date().toLocaleString()} | ${err}`;

        if (!rows.length) {
          res.status(200).send(`not exist user with ${req.query.email}`);
          return;
        }
        res.status(200).send(rows);
      }
    );
  }, res);
});

export default router;
