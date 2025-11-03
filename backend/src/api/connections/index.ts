import { Router } from "express";
import { ConnectionController } from "../../controllers/connectionController";

const router = Router();

router.post("/", ConnectionController.createConnection);
router.get("/", ConnectionController.getConnections);
router.get("/:id", ConnectionController.getConnectionById);
router.delete("/:id", ConnectionController.disconnectConnection);

export default router;
