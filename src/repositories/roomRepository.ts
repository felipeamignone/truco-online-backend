import Database from "../db";
import { RoomEntity } from "../entities";
import BaseRepository from "./baseRepository";

type RoomDB = {
  sal_id: number;
  sal_nome: string;
  usu_id: number;
};

export default class RoomRepository extends BaseRepository {
  constructor(db?: Database) {
    super(db);
  }

  async getById(id: number): Promise<RoomEntity | null> {
    const result = await this.db.dispatchQuery<RoomDB>(
      `SELECT * FROM tb_sala WHERE sal_id = ?`,
      [id]
    );
    return result.length > 0 ? this.toMap(result[0]) : null;
  }

  async getAll(): Promise<RoomEntity[] | null> {
    const result = await this.db.dispatchQuery<RoomDB>(`SELECT * FROM tb_sala`);
    return result.length ? result.map((row) => this.toMap(row)) : null;
  }

  async create(room: RoomEntity): Promise<Boolean> {
    return await this.db.dispatchNonQuery(
      `INSERT INTO tb_sala (sal_nome, usu_id) VALUES (?, ?)`,
      [room.name, room.ownerId]
    );
  }

  async update(room: RoomEntity): Promise<Boolean> {
    return await this.db.dispatchNonQuery(
      `UPDATE tb_sala SET sal_nome = ?, usu_id = ? WHERE sal_id = ?`,
      [room.name, room.ownerId, room.id]
    );
  }

  async delete(id: number): Promise<Boolean> {
    return await this.db.dispatchNonQuery(
      `DELETE FROM tb_sala WHERE sal_id = ?`,
      [id]
    );
  }

  toMap(row: RoomDB): RoomEntity {
    return new RoomEntity({
      id: row.sal_id,
      name: row.sal_nome,
      ownerId: row.usu_id,
    });
  }
}
