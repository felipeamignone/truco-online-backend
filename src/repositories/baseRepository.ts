import Database from "../db";

export default class BaseRepository {
  #db;
  get db() {
    return this.#db;
  }

  constructor(db?: Database) {
    this.#db = db ? db : new Database();
  }
}
