import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { UserRepository } from "../repositories";

interface TokenPayload {
  userId: number;
  userName: string;
}

export default class AuthMiddleware {
  generateToken(payload: TokenPayload): string {
    return jwt.sign(payload, process.env.JWT_SECRET as Secret, {
      expiresIn: process.env.JWT_EXPIRATION,
    });
  }

  async verifyToken(req: Request, res: Response, next: NextFunction) {
    const { token } = req.cookies;
    try {
      if (token) {
        const payload = jwt.verify(
          token,
          process.env.JWT_SECRET as Secret
        ) as TokenPayload;
        const repository = new UserRepository();
        const user = await repository.getById(payload.userId);

        if (user && user.id && user.name) {
          const renewedToken = this.generateToken({
            userId: user.id,
            userName: user.name,
          });

          res.cookie("token", renewedToken, {
            httpOnly: true,
          });
          req.authenticatedUser = user;
          return next();
        }

        throw new Error();
      }
      throw new Error();
    } catch (error) {
      res.status(401).json({ message: "Não autorizado!" });
    }
  }
}
