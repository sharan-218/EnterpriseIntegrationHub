/**
 * Represents a saved analytics dashboard for an organization.
 * Each dashboard defines its layout, widgets, and data queries in JSON format.
 */
export interface Dashboard {
  id: string; // UUID (Primary Key)
  org_id: string; // FK → organizations.id
  name: string; // Dashboard name (e.g. "Sales Overview", "Employee Metrics")
  config: {
    widgets: Array<{
      id: string;
      title: string;
      type: "bar" | "line" | "pie" | "metric" | "table";
      query: string; // High-level query definition (e.g., "sales_by_region")
      position?: { x: number; y: number; w: number; h: number };
    }>;
    theme?: "light" | "dark";
    refresh_interval?: number; // Auto-refresh in seconds
  };

  created_at: Date;
  updated_at: Date;
}
