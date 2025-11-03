import { roleRepository, Role } from "../../db/repositories/roleRepository";

export class RoleService {
  private roleRepo: roleRepository;

  constructor(roleRepo: roleRepository) {
    this.roleRepo = roleRepo;
  }

  async createRole(
    name: string,
    description: string,
    permissions: string[]
  ): Promise<Role> {
    if (!name) throw new Error("Role name is required.");

    return await this.roleRepo.createRole({
      name,
      description,
      permissions,
    });
  }

  async getAllRoles(): Promise<Role[]> {
    return await this.roleRepo.getAllRoles();
  }

  async getRoleById(id: string): Promise<Role | null> {
    if (!id) throw new Error("Role ID is required.");
    return await this.roleRepo.getRoleById(id);
  }

  async updateRole(id: string, updates: Partial<Role>): Promise<Role> {
    if (!id) throw new Error("Role ID is required.");
    return await this.roleRepo.updateRole(id, updates);
  }
  async deleteRole(id: string): Promise<boolean> {
    if (!id) throw new Error("Role ID is required.");
    return await this.roleRepo.deleteRole(id);
  }
}
