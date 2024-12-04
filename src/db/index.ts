import mysql, { ResultSetHeader } from "mysql2";

export default class Database {
  #conexao;

  get conexao() {
    return this.#conexao;
  }
  set conexao(conexao) {
    this.#conexao = conexao;
  }

  constructor() {
    this.#conexao = mysql.createPool({
      host: process.env.HOST_DB,
      database: process.env.DATABASE_NAME,
      user: process.env.USER_DB,
      password: process.env.PSW_DB,
    });
  }

  dispatchQuery<T>(sql: string, values?: unknown[]) {
    const cnn = this.#conexao;
    return new Promise<T[]>((resolve, reject) => {
      cnn.query(sql, values, (err, result) => {
        if (err) reject(err);
        resolve(result as T[]);
      });
    });
  }

  dispatchNonQuery(sql: string, values: unknown[]) {
    const cnn = this.#conexao;
    return new Promise<Boolean>((resolve, reject) => {
      cnn.query(sql, values, (err, result) => {
        if (err) reject(err);
        resolve((result as ResultSetHeader).affectedRows > 0);
      });
    });
  }

  dispatchLastInserted(sql: string, values: unknown[]) {
    const cnn = this.#conexao;
    return new Promise<Number>((resolve, reject) => {
      cnn.query(sql, values, (err, result) => {
        if (err) reject(err);
        resolve((result as ResultSetHeader).insertId);
      });
    });
  }

  openTransiction() {
    return this.dispatchQuery("START TRANSACTION");
  }

  rollback() {
    return this.dispatchQuery("ROLLBACK");
  }

  commit() {
    return this.dispatchQuery("COMMIT");
  }
}
