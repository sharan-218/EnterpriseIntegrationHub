import express, { Request, Response } from "express";
import { IntegrationService } from "../../services/platform/integrationService";

const router = express.Router();
const integrationService = new IntegrationService();

router.get("/", async (req: Request, res: Response) => {
  try {
    const { organization_id } = req.query;
    if (!organization_id)
      return res.status(400).json({ error: "organization_id is required" });
    const integrations = await integrationService.getIntegrationsByOrg(
      organization_id as string
    );

    res.json(integrations);
  } catch (error: any) {
    console.error("Error fetching integrations:", error);
    res.status(500).json({ error: error.message });
  }
});
router.post("/", async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    if (!payload.organization_id)
      return res.status(400).json({ error: "organization_id is required" });

    const integration = await integrationService.createIntegration(payload);
    res.status(201).json(integration);
  } catch (error: any) {
    console.error("Error creating integration:", error);
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:integration_id", async (req: Request, res: Response) => {
  try {
    const { integration_id } = req.params;
    const { organization_id } = req.query;

    if (!integration_id || !organization_id) {
      return res
        .status(400)
        .json({ error: "integration_id and organization_id are required" });
    }

    await integrationService.deleteIntegration(
      integration_id,
      organization_id as string
    );

    res.json({ message: "Integration deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting integration:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
