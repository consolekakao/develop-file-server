import express, { Request, Response } from "express";
import { Connection, QueryError, RowDataPacket } from "mysql2";
import { getConnection } from "../mysql/mysql.js";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  console.log(req.body);
  const { email, gender, nickname, phone_number, kakao_uid } = req.body;
  getConnection(async (conn: Connection) => {
    conn.query(
      //객체로 일부러 안 넣음.
      `insert into users (email, gender, name, phone_number, kakao_uid) values ("${email}","${gender}","${nickname}","${phone_number}","${kakao_uid}")`,
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
