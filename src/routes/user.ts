import { Router } from "express";
import { UserController } from "../controllers";
import { AuthMiddleware } from "../middlewares";

const router = Router();
const ctrl = new UserController();
const auth = new AuthMiddleware();

router.get("/", auth.verifyToken, ctrl.getAll);
router.get("/:id", auth.verifyToken, ctrl.getById);
router.post("/", ctrl.create);
router.post("/login", ctrl.logIn);
router.post("/logout", ctrl.logOut);

export default router;
