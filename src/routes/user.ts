import { Router } from "express";
import { UserController } from "../controllers";

const router = Router();
const ctrl = new UserController();

router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getById);
router.post("/", ctrl.create);
router.post("/login", ctrl.login);

export default router;
