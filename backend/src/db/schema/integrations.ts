/**
 * Represents a supported third-party SaaS integration.
 * Example: HubSpot, Zoho People, Stripe, Slack, etc.
 */
export interface Integration {
  id: string; // UUID (Primary Key)
  name: string; // Human-readable name of the integration (e.g. "HubSpot")
  category: "CRM" | "HRMS" | "PAYMENT" | "NOTIFICATION"; // Type of system
  auth_type: "OAUTH2" | "API_KEY" | "WEBHOOK"; // How authentication is handled
  base_url?: string; // Optional API base URL
  icon_url?: string; // Optional icon for frontend dashboard
  created_at: Date; // Timestamp
}
