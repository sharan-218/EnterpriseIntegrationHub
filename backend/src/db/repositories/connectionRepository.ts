import { supabaseAdmin as supabase } from "../../config/supabaseClient";

export class ConnectionRepository {
  async createConnection(payload: any) {
    const { data, error } = await supabase
      .from("connections")
      .insert(payload)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async getConnectionByIntegration(
    integration_id: string,
    organization_id: string
  ) {
    const { data, error } = await supabase
      .from("connections")
      .select("*")
      .eq("integration_id", integration_id)
      .eq("organization_id", organization_id);

    if (error) throw new Error(error.message);
    return data;
  }

  async getConnectionById(id: string, organization_id: string) {
    const { data, error } = await supabase
      .from("connections")
      .select("*")
      .eq("id", id)
      .eq("organization_id", organization_id)
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async deleteConnection(id: string) {
    const { error } = await supabase.from("connections").delete().eq("id", id);
    if (error) throw new Error(error.message);
  }
}
