import { Request, Response } from "express";
import { UserEntity } from "../entities";
import { UserRepository } from "../repositories";

export default class UserController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "Dados inválidos!" });
      }

      const repository = new UserRepository();
      const user = await repository.getByEmailAndPassword(email, password);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado!" });
      }

      //TODO: Implementar a geração do token JWT
      res.status(200).json({ message: "Usuário logado com sucesso!" });
    } catch (error: any) {
      res.status(500).json({
        message:
          "Não foi possível realizar o login! Tente novamente mais tarde",
      });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const repository = new UserRepository();
      const users = await repository.getAll();

      if (!users) {
        return res.status(404).json({ message: "Nenhum usuário encontrado!" });
      }

      res.status(200).json({ data: users });
    } catch (error: any) {
      res.status(500).json({
        message:
          "Não foi possível buscar os usuários! Tente novamente mais tarde",
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "ID inválido!" });
      }

      const repository = new UserRepository();
      const user = await repository.getById(Number(id));

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado!" });
      }

      res.status(200).json({ data: user });
    } catch (error: any) {
      res.status(500).json({
        message:
          "Não foi possível buscar o usuário! Tente novamente mais tarde",
      });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ message: "Dados inválidos!" });
      }

      const user = new UserEntity({ name, email, password });
      const repository = new UserRepository();

      const result = await repository.create(user);

      if (!result) {
        throw new Error();
      }

      res.status(201).json({ message: "Usuário criado com sucesso!" });
    } catch (error: any) {
      res.status(500).json({
        message: "Não foi possível criar o usuário! Tente novamente mais tarde",
      });
    }
  }
}