import express, { Request, Response } from "express";
import { Connection, QueryError, RowDataPacket } from "mysql2";
import { getConnection } from "./mysql.js";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  getConnection(async (conn: Connection) => {
    conn.query(
      `select * from users`,
      (err: QueryError, rows: RowDataPacket) => {
        if (err) throw "ERR";
        console.log(rows);
        res.send(rows);
      }
    );
  }, res);
});

export default router;
