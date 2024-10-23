import mysql, { PoolOptions, QueryResult, ResultSetHeader } from "mysql2";

const access: PoolOptions = {
  host: process.env.HOST_DB,
  database: process.env.DATABASE_NAME,
  user: process.env.USER_DB,
  password: process.env.PSW_DB,
};

const conn = mysql.createPool(access);

export const dispatchQuery = (sql: string, values?: unknown[]) => new Promise((resolve, reject) => {
  conn.query<QueryResult>(sql, values, (err, result) => {
    if(err) reject(err);
    resolve(result);
  })
})

export const dispatchNonQuery = (sql: string, values: unknown[]) => new Promise((resolve, reject) => {
  conn.query<QueryResult>(sql, values, (err, result) => {
    if(err) reject(err);
    resolve((result as ResultSetHeader).affectedRows > 0);
  })
})

export const dispatchLastInserted = (sql: string, values: unknown[]) => new Promise((resolve, reject) => {
  conn.query<QueryResult>(sql, values, (err, result) => {
    if(err) reject(err);
    resolve((result as ResultSetHeader).insertId);
  })
})
