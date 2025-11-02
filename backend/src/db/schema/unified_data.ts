/**
 * Represents normalized data records synchronized from external integrations.
 * Each record belongs to an organization and originates from a specific connection.
 */
export interface UnifiedData {
  id: string; // UUID (Primary Key)
  org_id: string; // FK → organizations.id
  connection_id: string; // FK → connections.id
  source_integration: string; // Integration name or ID for quick lookup

  entity_type: "customer" | "employee" | "transaction" | "event" | "custom";
  // Defines what kind of data this record represents.

  data: Record<string, any>; // JSONB — normalized structure of the entity

  synced_at: Date; // When the record was last updated from source
  created_at: Date; // Timestamp of record creation
}
