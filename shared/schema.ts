import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const properties = pgTable("properties", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(), // château, manoir, loft, villa, etc.
  price: integer("price").notNull(), // price in euros
  city: text("city").notNull(),
  address: text("address").notNull(),
  latitude: decimal("latitude", { precision: 10, scale: 6 }).notNull(),
  longitude: decimal("longitude", { precision: 10, scale: 6 }).notNull(),
  surface: integer("surface").notNull(), // in m²
  bedrooms: integer("bedrooms").notNull(),
  bathrooms: integer("bathrooms").notNull(),
  landSize: integer("land_size").notNull(), // in m²
  images: text("images").array().notNull(),
  features: text("features").array(),
  status: text("status").notNull().default("available"), // available, sold, reserved
  // Energy performance fields
  dpeValue: integer("dpe_value"), // kWh/m²/an
  dpeClass: text("dpe_class"), // A, B, C, D, E, F, G (auto-calculated)
  gesValue: integer("ges_value"), // kg CO2/m²/an  
  gesClass: text("ges_class"), // A, B, C, D, E, F, G (auto-calculated)
  // Display order for admin drag-and-drop
  displayOrder: integer("display_order").notNull().default(0)
});

export const contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  propertyId: varchar("property_id").references(() => properties.id),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const insertPropertySchema = createInsertSchema(properties).omit({
  id: true,
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
});

export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type Property = typeof properties.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;

// Keep existing user schema for consistency
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export const loginUserSchema = insertUserSchema.pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type LoginUser = z.infer<typeof loginUserSchema>;
export type User = typeof users.$inferSelect;
