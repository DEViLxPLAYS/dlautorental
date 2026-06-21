import { authRouter } from "./auth-router";
import { carRouter, rentalRouter } from "./car-router";
import { adminRouter } from "./admin-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  car: carRouter,
  rental: rentalRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;
