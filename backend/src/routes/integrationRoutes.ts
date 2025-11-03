import { Router, Request, Response } from "express";
import { IntegrationController } from "../controllers/integrationController";
import { IntegrationService } from "../services/platform/integrationService";
const router = Router();
const integrationService = new IntegrationService();

router.post("/", IntegrationController.createIntegration);

router.get("/", IntegrationController.getIntegrations);
router.get("/:id", IntegrationController.getIntegrationById);

router.delete("/:id", IntegrationController.deleteIntegration);

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { organization_id } = req.query;

  if (!organization_id) {
    return res.status(400).json({ error: "organization_id is required" });
  }

  try {
    const integration = await integrationService.getIntegrationById(id);
    if (!integration) {
      return res.status(404).json({ error: "Integration not found" });
    }
    res.json(integration);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
