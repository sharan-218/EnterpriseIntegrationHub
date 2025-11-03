import {
  OrganizationRepository,
  Organization,
} from "../../db/repositories/organizationRepository";

export class OrganizationService {
  private organizationRepo: OrganizationRepository;

  constructor(organizationRepo: OrganizationRepository) {
    this.organizationRepo = organizationRepo;
  }

  async createOrganization(
    name: string,
    ownerId: string,
    metadata: Record<string, any> = {}
  ): Promise<Organization> {
    if (!name || !ownerId) {
      throw new Error("Organization name and owner ID are required.");
    }

    return await this.organizationRepo.createOrganization({
      name,
      owner_id: ownerId,
      metadata,
    });
  }

  async getOrganizationsByOwner(ownerId: string): Promise<Organization[]> {
    if (!ownerId) throw new Error("Owner ID is required.");
    return await this.organizationRepo.findByOwnerId(ownerId);
  }

  async updateOrganization(
    id: string,
    updates: Partial<Organization>
  ): Promise<Organization> {
    if (!id) throw new Error("Organization ID is required.");
    return await this.organizationRepo.updateOrganization(id, updates);
  }

  async updateOrganizationMetadata(
    id: string,
    metadata: Record<string, any>
  ): Promise<Organization> {
    if (!id) throw new Error("Organization ID is required.");
    return await this.organizationRepo.updateMetadata(id, metadata);
  }

  async deleteOrganization(id: string): Promise<boolean> {
    if (!id) throw new Error("Organization ID is required.");
    return await this.organizationRepo.deleteOrganization(id);
  }
}
