/**
 * Maps users (from Clerk) to organizations with specific roles.
 * Enables role-based access control (RBAC) at the org level.
 */
export interface Role {
  id: string; // UUID (Primary Key)
  org_id: string; // FK → organizations.id
  user_id: string; // Clerk User ID
  role: "admin" | "manager" | "viewer"; // Permission level

  invited_by?: string; // Optional - Clerk ID of inviter
  created_at: Date;
}
