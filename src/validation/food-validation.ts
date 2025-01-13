import { z, ZodType } from "zod";

export class FoodValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(3).max(100),
    description: z.string().min(3).max(500),
    ingredients: z.string().min(3).max(500),
    image: z.string().optional(), // Optional, multer will handle this dynamically
    categoryId: z.number().positive(),
    cityId: z.number().positive(),
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.number().positive(),
    name: z.string().min(3).max(100).optional(),
    description: z.string().min(3).max(500).optional(),
    ingredients: z.string().min(3).max(500).optional(),
    image: z.string().optional(), // Optional for updates
    categoryId: z.number().positive().optional(),
    cityId: z.number().positive().optional(),
  });

  static readonly DELETE: ZodType = z.object({
    id: z.number().positive(),
  });

  static readonly READ_BY_ID: ZodType = z.object({
    id: z.number().positive(),
  });
}

