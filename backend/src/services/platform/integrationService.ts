import { IntegrationRepository } from "../../db/repositories/integrationRepository";
import { ConnectionRepository } from "../../db/repositories/connectionRepository";
import { UnifiedDataRepository } from "../../db/repositories/unifiedDataRepository";

export class IntegrationService {
  private integrationRepo = new IntegrationRepository();
  private connectionRepo = new ConnectionRepository();
  private unifiedDataRepo = new UnifiedDataRepository();

  async createIntegration(payload: {
    name: string;
    type: string;
    status?: string;
    config?: Record<string, any>;
    organization_id: string;
  }) {
    return await this.integrationRepo.createIntegration(payload);
  }

  async getIntegrationsByOrg(organization_id: string) {
    return await this.integrationRepo.getIntegrationsByOrg(organization_id);
  }

  async getIntegrationById(id: string) {
    return await this.integrationRepo.getIntegrationById(id);
  }

  async updateIntegration(id: string, updates: Partial<any>) {
    return await this.integrationRepo.updateIntegration(id, updates);
  }

  async deleteIntegration(integration_id: string, organization_id: string) {
    if (!integration_id || !organization_id)
      throw new Error("integration_id and organization_id are required");

    const connections = await this.connectionRepo.getConnectionByIntegration(
      integration_id,
      organization_id
    );

    if (connections && connections.length > 0) {
      for (const conn of connections) {
        await this.connectionRepo.deleteConnection(conn.id);
      }
    }

    return await this.integrationRepo.deleteIntegration(integration_id);
  }
}
