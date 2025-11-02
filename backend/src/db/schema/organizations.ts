/**
 * Represents a company or startup using the Enterprise Integration Hub.
 * Each organization is linked to a Clerk owner (created by that user).
 */
export interface Organization {
  id: string; // UUID (Primary Key)
  name: string; // Organization or company name
  domain?: string; // Optional - used for internal branding or verification
  owner_id: string; // Clerk User ID of the owner/admin
  plan_tier: "free" | "pro" | "enterprise"; // Billing tier or subscription plan
  created_at: Date; // Timestamp
}
