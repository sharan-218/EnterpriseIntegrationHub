import { Request, Response } from "express";
import { ConnectionService } from "../services/platform/connectionService";

const connectionService = new ConnectionService();

export class ConnectionController {
  static async createConnection(req: Request, res: Response) {
    try {
      const { integration_id, organization_id, tokens, metadata } = req.body;

      if (!integration_id || !organization_id || !tokens?.access_token) {
        return res.status(400).json({
          error:
            "integration_id, organization_id, and tokens.access_token are required",
        });
      }

      const connection = await connectionService.createConnection(
        integration_id,
        organization_id,
        tokens,
        metadata
      );

      res.status(201).json(connection);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
  static async getConnections(req: Request, res: Response) {
    try {
      const { integration_id, organization_id } = req.query;

      if (!integration_id || !organization_id) {
        return res
          .status(400)
          .json({ error: "integration_id and organization_id are required" });
      }

      const connections = await connectionService.getConnections(
        integration_id as string,
        organization_id as string
      );

      res.json(connections);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
  static async getConnectionById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { organization_id } = req.query;

      if (!id || !organization_id) {
        return res
          .status(400)
          .json({ error: "id and organization_id are required" });
      }

      const connection = await connectionService.getConnectionById(
        id,
        organization_id as string
      );

      if (!connection) {
        return res.status(404).json({ error: "Connection not found" });
      }

      res.json(connection);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
  static async disconnectConnection(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id)
        return res.status(400).json({ error: "Connection ID is required." });

      await connectionService.disconnectConnection(id);
      res.json({ message: "Connection disconnected successfully." });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
