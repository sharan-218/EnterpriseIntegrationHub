import { supabaseAdmin as supabase } from "../../config/supabaseClient";

export class ConnectionRepository {
  private table = "connections";
  async createConnection(data: {
    integration_id: string;
    organization_id: string;
    access_token: string;
    refresh_token?: string;
    expires_at?: string;
    status?: string;
    metadata?: Record<string, any>;
  }) {
    const { data: result, error } = await supabase
      .from(this.table)
      .insert([data])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return result;
  }
  async getConnectionByIntegration(
    integration_id: string,
    organization_id: string
  ) {
    const { data, error } = await supabase
      .from(this.table)
      .select("*")
      .eq("integration_id", integration_id)
      .eq("organization_id", organization_id);

    if (error) throw new Error(error.message);
    return data;
  }

  async getConnectionById(id: string) {
    const { data, error } = await supabase
      .from(this.table)
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async updateConnection(id: string, updates: Partial<any>) {
    const { data, error } = await supabase
      .from(this.table)
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }
  async deleteConnection(id: string) {
    const { error } = await supabase.from(this.table).delete().eq("id", id);
    if (error) throw new Error(error.message);
    return true;
  }
}
