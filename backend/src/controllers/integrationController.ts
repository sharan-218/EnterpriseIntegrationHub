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
      const integrations = await integrationService.getIntegrations(
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
      await integrationService.deleteIntegration(id);
      res.json({ message: "Integration deleted successfully." });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
