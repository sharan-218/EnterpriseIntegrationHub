import { Router } from "express";
import { IntegrationController } from "../../controllers/integrationController";

const router = Router();

router.post("/", IntegrationController.createIntegration);

router.get("/", IntegrationController.getIntegrations);

router.get("/:id", IntegrationController.getIntegrationById);
router.delete("/:id", IntegrationController.deleteIntegration);

export default router;
