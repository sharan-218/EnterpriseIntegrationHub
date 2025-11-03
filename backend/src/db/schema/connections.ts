/**
 * Represents an active connection between an organization and an external integration.
 * Example: Organization "ABC Corp" connected to "HubSpot" using OAuth2.
 */
export interface Connection {
  id: string; // UUID (Primary Key)
  org_id: string; // FK → organizations.id
  integration_id: string; // FK → integrations.id

  access_token?: string; // OAuth2 access token
  refresh_token?: string; // OAuth2 refresh token
  api_key?: string; // For API-key based integrations

  status: "active" | "expired" | "revoked" | "error";
  last_sync_at?: Date; // Last successful sync timestamp
  created_at: Date; // Creation timestamp
}
