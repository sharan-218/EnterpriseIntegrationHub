import { IntegrationRepository } from "../../db/repositories/integrationRepository";

export class IntegrationService {
  private integrationRepo: IntegrationRepository;

  constructor() {
    this.integrationRepo = new IntegrationRepository();
  }

  async registerIntegration(
    orgId: string,
    name: string,
    type: string,
    config: Record<string, any>
  ) {
    if (!orgId || !name || !type) {
      throw new Error("Missing required fields for integration registration.");
    }

    return await this.integrationRepo.createIntegration({
      organization_id: orgId,
      name,
      type,
      config,
      status: "active",
    });
  }

  async getIntegrationsForOrg(orgId: string) {
    if (!orgId) throw new Error("Organization ID is required.");
    return await this.integrationRepo.getAllIntegrations(orgId);
  }

  async updateIntegration(id: string, updates: Partial<any>) {
    if (!id) throw new Error("Integration ID is required.");
    return await this.integrationRepo.updateIntegration(id, updates);
  }

  async removeIntegration(id: string) {
    if (!id) throw new Error("Integration ID is required.");
    return await this.integrationRepo.deleteIntegration(id);
  }
}
