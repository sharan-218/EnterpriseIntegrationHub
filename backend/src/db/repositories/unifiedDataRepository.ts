import { supabaseAdmin as supabase } from "../../config/supabaseClient";

export class UnifiedDataRepository {
  private table = "unified_data";
  async createUnifiedData(data: {
    organization_id: string;
    integration_id: string;
    data_type: string;
    external_id: string;
    payload: Record<string, any>;
    synced_at?: string;
  }) {
    const { data: result, error } = await supabase
      .from(this.table)
      .insert([data])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return result;
  }

  async bulkInsertUnifiedData(
    records: Array<{
      organization_id: string;
      integration_id: string;
      data_type: string;
      external_id: string;
      payload: Record<string, any>;
      synced_at?: string;
    }>
  ) {
    const { data, error } = await supabase
      .from(this.table)
      .insert(records)
      .select();

    if (error) throw new Error(error.message);
    return data;
  }

  async getUnifiedData(
    organization_id: string,
    integration_id: string,
    data_type?: string
  ) {
    let query = supabase
      .from(this.table)
      .select("*")
      .eq("organization_id", organization_id)
      .eq("integration_id", integration_id);

    if (data_type) {
      query = query.eq("data_type", data_type);
    }

    const { data, error } = await query.order("synced_at", {
      ascending: false,
    });

    if (error) throw new Error(error.message);
    return data;
  }

  async getByExternalId(
    external_id: string,
    data_type: string,
    integration_id: string
  ) {
    const { data, error } = await supabase
      .from(this.table)
      .select("*")
      .eq("external_id", external_id)
      .eq("data_type", data_type)
      .eq("integration_id", integration_id)
      .single();

    if (error) throw new Error(error.message);
    return data;
  }
  async updateUnifiedData(id: string, updates: Partial<any>) {
    const { data, error } = await supabase
      .from(this.table)
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async deleteUnifiedData(id: string) {
    const { error } = await supabase.from(this.table).delete().eq("id", id);
    if (error) throw new Error(error.message);
    return true;
  }
}
