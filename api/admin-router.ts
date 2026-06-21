import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { TRPCError } from "@trpc/server";
import { SignJWT, jwtVerify } from "jose";

const ADMIN_USERNAME = "dlautorental";
const ADMIN_PASSWORD = "dlautorental@1";
const JWT_SECRET = new TextEncoder().encode("dl-auto-rental-admin-secret-key-2024");

async function createAdminToken() {
  return new SignJWT({ isAdmin: true, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .setIssuedAt()
    .sign(JWT_SECRET);
}

export async function verifyAdminToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, { clockTolerance: 60 });
    return payload.isAdmin === true;
  } catch {
    return false;
  }
}

export const adminRouter = createRouter({
  login: publicQuery
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      if (input.username === ADMIN_USERNAME && input.password === ADMIN_PASSWORD) {
        const token = await createAdminToken();
        return { success: true, token };
      }
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid credentials",
      });
    }),

  verify: publicQuery.query(async ({ ctx }) => {
    const authHeader = ctx.req.headers.get("x-admin-token");
    if (!authHeader) {
      return { isAdmin: false };
    }
    const isValid = await verifyAdminToken(authHeader);
    return { isAdmin: isValid };
  }),
});
