import { SupabaseClient } from "@supabase/supabase-js";

export class BaseRepository<T extends Record<string, any>> {
  protected tableName: string;
  protected supabase: SupabaseClient;

  constructor(supabase: SupabaseClient, tableName: string) {
    this.supabase = supabase;
    this.tableName = tableName;
  }
  async findAll(): Promise<T[]> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select("*");
    if (error)
      throw new Error(
        `Error fetching from ${this.tableName}: ${error.message}`
      );
    return data || [];
  }

  async findById(id: string | number): Promise<T | null> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null; // record not found
      throw new Error(
        `Error fetching record from ${this.tableName}: ${error.message}`
      );
    }

    return data;
  }

  async insert(record: Partial<T>): Promise<T> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .insert(record)
      .select()
      .single();
    if (error)
      throw new Error(
        `Error inserting into ${this.tableName}: ${error.message}`
      );
    return data;
  }
  async update(id: string | number, updates: Partial<T>): Promise<T> {
    const { data, error } = await this.supabase
      .from(this.tableName)
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error)
      throw new Error(`Error updating ${this.tableName}: ${error.message}`);
    return data;
  }

  async delete(id: string | number): Promise<boolean> {
    const { error } = await this.supabase
      .from(this.tableName)
      .delete()
      .eq("id", id);
    if (error)
      throw new Error(
        `Error deleting from ${this.tableName}: ${error.message}`
      );
    return true;
  }
}
