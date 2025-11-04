import { Request, Response } from "express";
import { IntegrationService } from "../services/platform/integrationService";
import { ConnectionService } from "../services/platform/connectionService";

const integrationService = new IntegrationService();
const connectionService = new ConnectionService();

export class DashboardController {
  static async getDashboardData(req: Request, res: Response) {
    try {
      const { organization_id } = req.query;

      if (!organization_id) {
        return res.status(400).json({ error: "organization_id is required" });
      }
      const integrations = await integrationService.getIntegrationsByOrg(
        organization_id as string
      );

      const connectionsData: any[] = [];

      for (const integration of integrations) {
        const connections = await connectionService.getConnections(
          integration.id,
          organization_id as string
        );

        connectionsData.push({
          integration_id: integration.id,
          integration_name: integration.name,
          connections,
        });
      }

      const summary = {
        total_integrations: integrations.length,
        total_connections: connectionsData.reduce(
          (sum, i) => sum + i.connections.length,
          0
        ),
        last_updated: new Date().toISOString(),
      };

      res.json({
        organization_id,
        integrations,
        connections: connectionsData,
        summary,
      });
    } catch (error: any) {
      console.error("Dashboard error:", error);
      res.status(500).json({ error: error.message });
    }
  }
}
