import { SupabaseClient } from "@supabase/supabase-js";
import { BaseRepository } from "./baseRepository";

export interface Organization {
  id: string;
  name: string;
  owner_id: string;
  created_at?: string;
  updated_at?: string;
  metadata?: Record<string, any>;
}

export class OrganizationRepository extends BaseRepository<Organization> {
  constructor(supabase: SupabaseClient) {
    super(supabase, "organizations");
  }
  async findByOwnerId(ownerId: string): Promise<Organization[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select("*")
      .eq("owner_id", ownerId);

    if (error)
      throw new Error(
        `Error fetching organizations by owner: ${error.message}`
      );
    return data || [];
  }

  async createOrganization(
    org: Pick<Organization, "name" | "owner_id" | "metadata">
  ): Promise<Organization> {
    const newOrg = await this.insert(org);
    return newOrg;
  }

  async updateOrganization(
    id: string,
    updates: Partial<Organization>
  ): Promise<Organization> {
    const updated = await this.update(id, updates);
    return updated;
  }

  async deleteOrganization(id: string): Promise<boolean> {
    return await this.delete(id);
  }
  async updateMetadata(
    id: string,
    metadata: Record<string, any>
  ): Promise<Organization> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .update({ metadata })
      .eq("id", id)
      .select()
      .single();

    if (error)
      throw new Error(`Error updating organization metadata: ${error.message}`);
    return data;
  }
}
