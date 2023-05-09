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

router.post("/", async (req: Request, res: Response) => {
  console.log(req.body);
  const { email, gender, name, phone_number, id } = req.body;
  getConnection(async (conn: Connection) => {
    conn.query(
      `
    select count(*) as cnt from users where kakao_uid="${id}"`,
      (err: QueryError, rows: any) => {
        console.log("::::", rows);
        if (err)
          throw `[ERROR] MYSQL_USER_GET ${new Date().toLocaleString()} | ${err}`;
        if (rows[0].cnt > 0) {
          res.status(200).send();
          return;
        }
      }
    );
    conn.query(
      `insert into users (email, gender, name, phone_number, kakao_uid) values ("${email}","${gender}","${name}","${phone_number}","${id}")`,
      (err: QueryError, rows: RowDataPacket) => {
        if (err)
          throw `[ERROR] MYSQL_USER_GET ${new Date().toLocaleString()} | ${err}`;

        // if (!rows.length) {
        //   res.status(200).send(`not exist user with ${req.query.email}`);
        //   return;
        // }
        res.status(200).send(rows);
      }
    );
  }, res);
});

export default router;
