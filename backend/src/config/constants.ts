/**
 * Global constants and enums used across the Enterprise Integration Hub backend.
 * These help avoid hardcoding repeated values and maintain consistency.
 */

/* ---------------------------
 * SYSTEM CONSTANTS
 * ---------------------------
 */
export const SYSTEM = {
  NAME: "Enterprise Integration Hub",
  VERSION: "1.0.0",
  DEFAULT_TIMEZONE: "UTC",
  DEFAULT_SYNC_INTERVAL_MINUTES: 30,
  MAX_RETRY_ATTEMPTS: 3,
  LOG_LEVEL: "info",
} as const;

/* ---------------------------
 * SUPPORTED INTEGRATION TYPES
 * ---------------------------
 */
export const INTEGRATION_TYPES = {
  CRM: "crm",
  HRMS: "hrms",
  PAYMENTS: "payments",
  NOTIFICATIONS: "notifications",
} as const;

export type IntegrationType =
  (typeof INTEGRATION_TYPES)[keyof typeof INTEGRATION_TYPES];

/* ---------------------------
 * SYNC STATUS ENUMS
 * ---------------------------
 */
export enum SYNC_STATUS {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  SUCCESS = "success",
  FAILED = "failed",
}

/* ---------------------------
 * ROLE-BASED ACCESS LEVELS
 * ---------------------------
 */
export enum ROLE {
  SUPER_ADMIN = "super_admin",
  ORG_ADMIN = "org_admin",
  MEMBER = "member",
  VIEWER = "viewer",
}

/* ---------------------------
 * ANALYTICS METRICS KEYS
 * ---------------------------
 */
export const ANALYTICS_KEYS = {
  TOTAL_TRANSACTIONS: "total_transactions",
  ACTIVE_EMPLOYEES: "active_employees",
  REVENUE: "revenue",
  SYNC_SUCCESS_RATE: "sync_success_rate",
} as const;

/* ---------------------------
 * NOTIFICATION CHANNELS
 * ---------------------------
 */
export const NOTIFICATION_CHANNELS = {
  EMAIL: "email",
  SLACK: "slack",
  WEBHOOK: "webhook",
} as const;

/* ---------------------------
 * API RESPONSE CODES
 * ---------------------------
 */
export const RESPONSE = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
} as const;

/* ---------------------------
 * QUEUE JOB TYPES (Scheduler)
 * ---------------------------
 */
export const JOB_TYPES = {
  SYNC_JOB: "sync_job",
  ANALYTICS_JOB: "analytics_job",
  CLEANUP_JOB: "cleanup_job",
} as const;
