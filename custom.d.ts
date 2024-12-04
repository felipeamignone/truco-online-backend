import { UserEntity } from "./src/entities";
import "express";

declare module "express" {
  // Inject additional properties on express.Request
  interface Request {
    authenticatedUser?: UserEntity;
  }
}
