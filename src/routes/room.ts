import { Router } from "express";
import { RoomController } from "../controllers";

const router = Router();
const ctrl = new RoomController();

router.get("/", ctrl.getAll);
router.post("/", ctrl.create);

export default router;
