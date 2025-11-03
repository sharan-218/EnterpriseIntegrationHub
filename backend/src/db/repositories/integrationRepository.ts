import { supabaseAdmin as supabase } from "../../config/supabaseClient";

export class IntegrationRepository {
  private table = "integrations";

  async createIntegration(data: {
    name: string;
    type: string;
    status?: string;
    config?: Record<string, any>;
    organization_id: string;
  }) {
    const { data: integration, error } = await supabase
      .from(this.table)
      .insert([{ ...data }])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return integration;
  }

  async getAllIntegrations(organization_id: string) {
    const { data, error } = await supabase
      .from(this.table)
      .select("*")
      .eq("organization_id", organization_id);

    if (error) throw new Error(error.message);
    return data;
  }

  async getIntegrationById(id: string) {
    const { data, error } = await supabase
      .from(this.table)
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async updateIntegration(id: string, updates: Partial<any>) {
    const { data, error } = await supabase
      .from(this.table)
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }
  async getIntegrationsByOrg(organization_id: string) {
    const { data, error } = await supabase
      .from(this.table)
      .select("*")
      .eq("organization_id", organization_id);

    if (error) throw new Error(error.message);
    return data;
  }

  async deleteIntegration(id: string) {
    const { error } = await supabase.from(this.table).delete().eq("id", id);
    if (error) throw new Error(error.message);
  }
}
