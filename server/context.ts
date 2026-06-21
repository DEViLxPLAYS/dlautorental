import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import type { User } from "@db/schema";
import { authenticateRequest } from "./kimi/auth";
import { verifyAdminToken } from "./admin-router";

export type TrpcContext = {
  req: Request;
  resHeaders: Headers;
  user?: User;
  isAdmin?: boolean;
};

export async function createContext(
  opts: FetchCreateContextFnOptions,
): Promise<TrpcContext> {
  const ctx: TrpcContext = { req: opts.req, resHeaders: opts.resHeaders };
  
  // Try OAuth authentication
  try {
    ctx.user = await authenticateRequest(opts.req.headers);
  } catch {
    // Authentication is optional here
  }

  // Check admin token
  try {
    const adminToken = opts.req.headers.get("x-admin-token");
    if (adminToken) {
      ctx.isAdmin = await verifyAdminToken(adminToken);
    }
  } catch {
    // Admin auth is optional
  }

  return ctx;
}
