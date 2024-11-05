import Database from "../db";
import UserEntity from "../entities/userEntity";
import BaseRepository from "./baseRepository";

type UserDB = {
  usu_id: number;
  usu_nome: string;
  usu_email: string;
  usu_senha: string;
};

export default class UserRepository extends BaseRepository {
  constructor(db?: Database) {
    super(db);
  }

  async getByEmailAndPassword(
    email: string,
    password: string
  ): Promise<UserEntity | null> {
    const result = await this.db.dispatchQuery<UserDB>(
      `SELECT * FROM tb_usuario WHERE usu_email = ? AND usu_senha = ?`,
      [email, password]
    );
    return result.length > 0 ? this.toMap(result[0]) : null;
  }

  async getById(id: number): Promise<UserEntity | null> {
    const result = await this.db.dispatchQuery<UserDB>(
      `SELECT * FROM tb_usuario WHERE usu_id = ?`,
      [id]
    );
    return result.length > 0 ? this.toMap(result[0]) : null;
  }

  async getAll(): Promise<UserEntity[] | null> {
    const result = await this.db.dispatchQuery<UserDB>(
      `SELECT * FROM tb_usuario`
    );
    return result.length ? result.map((row) => this.toMap(row)) : null;
  }

  async create(user: UserEntity): Promise<Boolean> {
    return await this.db.dispatchNonQuery(
      `INSERT INTO tb_usuario (usu_nome, usu_email, usu_senha) VALUES (?, ?, ?)`,
      [user.name, user.email, user.password]
    );
  }

  async update(user: UserEntity): Promise<Boolean> {
    return await this.db.dispatchNonQuery(
      `UPDATE tb_usuario SET usu_nome = ?, usu_email = ?, usu_senha = ? WHERE usu_id = ?`,
      [user.name, user.email, user.password, user.id]
    );
  }

  async delete(id: number): Promise<Boolean> {
    return await this.db.dispatchNonQuery(
      `DELETE FROM tb_usuario WHERE usu_id = ?`,
      [id]
    );
  }

  toMap(row: UserDB): UserEntity {
    return new UserEntity({
      id: row.usu_id,
      name: row.usu_nome,
      email: row.usu_email,
      password: row.usu_senha,
    });
  }
}
