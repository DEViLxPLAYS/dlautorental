import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { cars, rentals } from "@db/schema";
import { eq, and, desc, count } from "drizzle-orm";

export const carRouter = createRouter({
  list: publicQuery
    .input(
      z.object({
        type: z.string().optional(),
        brand: z.string().optional(),
        isDiscounted: z.boolean().optional(),
        limit: z.number().min(1).max(100).optional().default(50),
        offset: z.number().min(0).optional().default(0),
      }).optional()
    )
    .query(async ({ input }) => {
      const db = getDb();
      const filters = [];
      const params = input ?? { limit: 50, offset: 0 };

      if (params.type) {
        filters.push(eq(cars.type, params.type as "sedan" | "suv" | "truck" | "luxury" | "sports"));
      }
      if (params.brand) {
        filters.push(eq(cars.brand, params.brand));
      }
      if (params.isDiscounted !== undefined) {
        filters.push(eq(cars.isDiscounted, params.isDiscounted));
      }

      const where = filters.length > 0 ? and(...filters, eq(cars.isAvailable, true)) : eq(cars.isAvailable, true);

      const limit = params.limit ?? 50;
      const offset = params.offset ?? 0;

      const [carsList, totalResult] = await Promise.all([
        db
          .select()
          .from(cars)
          .where(where)
          .limit(limit)
          .offset(offset)
          .orderBy(desc(cars.createdAt)),
        db.select({ value: count() }).from(cars).where(where),
      ]);

      return {
        cars: carsList,
        total: totalResult[0]?.value ?? 0,
      };
    }),

  getById: publicQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const result = await db
        .select()
        .from(cars)
        .where(eq(cars.id, input.id))
        .limit(1);
      return result[0] ?? null;
    }),

  create: adminQuery
    .input(
      z.object({
        name: z.string().min(1),
        brand: z.string().min(1),
        year: z.number().min(1900).max(2030),
        type: z.enum(["sedan", "suv", "truck", "luxury", "sports"]),
        pricePerDay: z.string().or(z.number()),
        discountedPrice: z.string().or(z.number()).optional(),
        imageUrl: z.string().min(1),
        gallery: z.array(z.string()).optional(),
        description: z.string().optional(),
        features: z.array(z.string()).optional(),
        isDiscounted: z.boolean().optional(),
        isAvailable: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(cars).values({
        name: input.name,
        brand: input.brand,
        year: input.year,
        type: input.type,
        pricePerDay: String(input.pricePerDay),
        discountedPrice: input.discountedPrice ? String(input.discountedPrice) : undefined,
        imageUrl: input.imageUrl,
        gallery: input.gallery ?? [],
        description: input.description,
        features: input.features ?? [],
        isDiscounted: input.isDiscounted ?? false,
        isAvailable: input.isAvailable ?? true,
      });
      const insertedId = Number(result[0].insertId);
      const car = await db.select().from(cars).where(eq(cars.id, insertedId)).limit(1);
      return car[0];
    }),

  update: adminQuery
    .input(
      z.object({
        id: z.number(),
        name: z.string().min(1).optional(),
        brand: z.string().min(1).optional(),
        year: z.number().min(1900).max(2030).optional(),
        type: z.enum(["sedan", "suv", "truck", "luxury", "sports"]).optional(),
        pricePerDay: z.string().or(z.number()).optional(),
        discountedPrice: z.string().or(z.number()).optional(),
        imageUrl: z.string().min(1).optional(),
        gallery: z.array(z.string()).optional(),
        description: z.string().optional(),
        features: z.array(z.string()).optional(),
        isDiscounted: z.boolean().optional(),
        isAvailable: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const { id, ...updateData } = input;
      
      const updatePayload: Record<string, unknown> = {};
      if (updateData.name !== undefined) updatePayload.name = updateData.name;
      if (updateData.brand !== undefined) updatePayload.brand = updateData.brand;
      if (updateData.year !== undefined) updatePayload.year = updateData.year;
      if (updateData.type !== undefined) updatePayload.type = updateData.type;
      if (updateData.pricePerDay !== undefined) updatePayload.pricePerDay = String(updateData.pricePerDay);
      if (updateData.discountedPrice !== undefined) updatePayload.discountedPrice = updateData.discountedPrice ? String(updateData.discountedPrice) : null;
      if (updateData.imageUrl !== undefined) updatePayload.imageUrl = updateData.imageUrl;
      if (updateData.gallery !== undefined) updatePayload.gallery = updateData.gallery;
      if (updateData.description !== undefined) updatePayload.description = updateData.description;
      if (updateData.features !== undefined) updatePayload.features = updateData.features;
      if (updateData.isDiscounted !== undefined) updatePayload.isDiscounted = updateData.isDiscounted;
      if (updateData.isAvailable !== undefined) updatePayload.isAvailable = updateData.isAvailable;

      await db.update(cars).set(updatePayload).where(eq(cars.id, id));
      const car = await db.select().from(cars).where(eq(cars.id, id)).limit(1);
      return car[0];
    }),

  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(cars).where(eq(cars.id, input.id));
      return { success: true };
    }),
});

export const rentalRouter = createRouter({
  create: publicQuery
    .input(
      z.object({
        carId: z.number(),
        customerName: z.string().min(1),
        customerEmail: z.string().email(),
        customerPhone: z.string().min(1),
        startDate: z.string(),
        endDate: z.string(),
        notes: z.string().optional(),
        totalPrice: z.string().or(z.number()),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const insertValues: Record<string, unknown> = {
        carId: input.carId,
        customerName: input.customerName,
        customerEmail: input.customerEmail,
        customerPhone: input.customerPhone,
        startDate: input.startDate,
        endDate: input.endDate,
        totalPrice: String(input.totalPrice),
      };
      if (input.notes) insertValues.notes = input.notes;
      const result = await db.insert(rentals).values(insertValues as typeof rentals.$inferInsert);
      return { id: Number(result[0].insertId) };
    }),

  list: adminQuery
    .input(z.object({ status: z.string().optional() }).optional())
    .query(async ({ input }) => {
      const db = getDb();
      const params = input ?? {};
      if (params.status) {
        return db.select().from(rentals).where(eq(rentals.status, params.status as "pending" | "confirmed" | "completed" | "cancelled")).orderBy(desc(rentals.createdAt));
      }
      return db.select().from(rentals).orderBy(desc(rentals.createdAt));
    }),

  updateStatus: adminQuery
    .input(z.object({ id: z.number(), status: z.enum(["pending", "confirmed", "completed", "cancelled"]) }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.update(rentals).set({ status: input.status }).where(eq(rentals.id, input.id));
      return { success: true };
    }),
});
