import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export interface Role {
  id: string;
  name: string;
  description?: string;
  permissions: string[];
  created_at?: string;
  updated_at?: string;
}

export class roleRepository {
  private table = "roles";

  async createRole(
    role: Omit<Role, "id" | "created_at" | "updated_at">
  ): Promise<Role> {
    const { data, error } = await supabase
      .from(this.table)
      .insert(role)
      .select()
      .single();
    if (error) throw error;
    return data as Role;
  }

  async getAllRoles(): Promise<Role[]> {
    const { data, error } = await supabase.from(this.table).select("*");
    if (error) throw error;
    return data as Role[];
  }

  async getRoleById(id: string): Promise<Role | null> {
    const { data, error } = await supabase
      .from(this.table)
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      if (error.code === "PGRST116") return null; // record not found
      throw error;
    }
    return data as Role;
  }

  async updateRole(id: string, updates: Partial<Role>): Promise<Role> {
    const { data, error } = await supabase
      .from(this.table)
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as Role;
  }

  async deleteRole(id: string): Promise<boolean> {
    const { error } = await supabase.from(this.table).delete().eq("id", id);
    if (error) throw error;
    return true;
  }
}
