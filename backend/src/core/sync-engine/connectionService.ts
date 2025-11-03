import { ConnectionRepository } from "../../db/repositories/connectionRepository";

export class ConnectionService {
  private connectionRepo: ConnectionRepository;

  constructor() {
    this.connectionRepo = new ConnectionRepository();
  }

  async createConnection(
    integrationId: string,
    organizationId: string,
    tokens: {
      access_token: string;
      refresh_token?: string;
      expires_at?: string;
    },
    metadata: Record<string, any> = {}
  ) {
    if (!integrationId || !organizationId || !tokens.access_token) {
      throw new Error(
        "Integration ID, Organization ID, and access token are required."
      );
    }

    return await this.connectionRepo.createConnection({
      integration_id: integrationId,
      organization_id: organizationId,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_at: tokens.expires_at,
      metadata,
      status: "connected",
    });
  }

  async getConnections(integrationId: string, organizationId: string) {
    if (!integrationId || !organizationId)
      throw new Error("Integration ID and Organization ID are required.");

    return await this.connectionRepo.getConnectionByIntegration(
      integrationId,
      organizationId
    );
  }

  async disconnectConnection(id: string) {
    if (!id) throw new Error("Connection ID required.");
    return await this.connectionRepo.deleteConnection(id);
  }
}
