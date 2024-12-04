import { Request, Response } from "express";
import { RoomRepository } from "../repositories";
import { RoomEntity } from "../entities";

export default class RoomController {
  async getAll(req: Request, res: Response) {
    try {
      const repository = new RoomRepository();
      const rooms = await repository.getAll();

      if (!rooms) {
        return res.status(404).json({ message: "Nenhuma sala encontrada!" });
      }

      res.status(200).json({ data: rooms });
    } catch (error: any) {
      res.status(500).json({
        message: "Não foi possível buscar as salas! Tente novamente mais tarde",
      });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const ownerId = req.authenticatedUser?.id;

      if (!name || !ownerId) {
        return res.status(400).json({ message: "Dados inválidos!" });
      }

      const room = new RoomEntity({ name, ownerId });
      const repository = new RoomRepository();

      const result = await repository.create(room);

      if (!result) {
        throw new Error();
      }

      res.status(201).json({ data: room });
    } catch (error: any) {
      res.status(500).json({
        message: "Não foi possível criar a sala! Tente novamente mais tarde",
      });
    }
  }
}
