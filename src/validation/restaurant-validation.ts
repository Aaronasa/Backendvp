import { z, ZodType } from "zod";

export class RestaurantValidation {
  // Schema for creating a restaurant
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(3).max(100),
    address: z.string().min(5).max(200),
    phone: z.string().regex(/^[0-9\-+]{9,15}$/), // Validates phone number format
    image: z.string(), // Validates a proper URL for image
  });

  // Schema for updating a restaurant
  static readonly UPDATE: ZodType = z.object({
    id: z.number().positive(),
    name: z.string().min(3).max(100).optional(),
    address: z.string().min(5).max(200).optional(),
    phone: z.string().regex(/^[0-9\-+]{9,15}$/).optional(),
    image: z.string(),
  });

  // Schema for deleting a restaurant
  static readonly DELETE: ZodType = z.object({
    id: z.number().positive(),
  });

  // Schema for reading a restaurant by ID
  static readonly READ_BY_ID: ZodType = z.object({
    id: z.number().positive(),
  });
}
