import { UserEntity } from "./src/entities";

declare module "express" {
  // Inject additional properties on express.Request
  interface Request {
    authenticatedUser?: UserEntity;
  }
}
