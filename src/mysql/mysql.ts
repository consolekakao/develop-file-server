import { Response } from "express";
import mysql from "mysql2";
import config from "dotenv";
config.config();
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: 3306,
  connectTimeout: 5000,
});

export const getConnection = async (callback: any, res: Response) => {
  pool.getConnection((err, conn) => {
    try {
      if (err) {
        res.status(500).send("[ERROR] MYSQL_GET_CONNECTION_ERROR");
        throw `[ERROR] MYSQL_GET_CONNECTION_ERROR ${new Date().toLocaleString()} | ${err}`;
      }
      callback(conn);
      conn.release();
    } catch (err) {
      console.log(err);
      return;
    }
  });
};
