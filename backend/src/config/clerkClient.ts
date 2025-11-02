import { clerkClient, verifyToken } from "@clerk/clerk-sdk-node";
import "dotenv/config";

/**
 * Verify a Clerk JWT token and return decoded claims.
 * Throws if token is missing or invalid.
 */
export async function verifyAuth(token?: string) {
  if (!token) throw new Error("Missing Authorization token");
  const session = await verifyToken(token, {});

  return {
    userId: session?.sub ?? null,
    email: session?.email ?? null,
    claims: session,
  };
}

export { clerkClient };
