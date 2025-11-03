import { Request, Response } from "express";
import { IntegrationService } from "../services/platform/integrationService";

const integrationService = new IntegrationService();

export class IntegrationController {
  static async createIntegration(req: Request, res: Response) {
    try {
      const { name, type, organization_id, config } = req.body;
      const integration = await integrationService.createIntegration({
        name,
        type,
        organization_id,
        config,
      });
      res.status(201).json(integration);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getIntegrations(req: Request, res: Response) {
    try {
      const { organization_id } = req.query;

      if (!organization_id) {
        return res.status(400).json({ error: "organization_id is required" });
      }

      const integrations = await integrationService.getIntegrationsByOrg(
        organization_id as string
      );
      res.json(integrations);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteIntegration(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { organization_id } = req.query;

      if (!organization_id) {
        return res.status(400).json({ error: "organization_id is required" });
      }

      await integrationService.deleteIntegration(id, organization_id as string);

      res.json({ message: "Integration deleted successfully." });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getIntegrationById(req: Request, res: Response) {
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
  }
}
