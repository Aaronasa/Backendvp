import { z, ZodType } from "zod";

export class FoodRestaurantValidation {
  static readonly CREATE: ZodType = z.object({
    foodId: z.number().positive(),
    restaurantId: z.number().positive(),
    price: z.number().positive(),
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.number().positive(),
    foodId: z.number().positive().optional(),
    restaurantId: z.number().positive().optional(),
    price: z.number().positive().optional(),
  });

  static readonly DELETE: ZodType = z.object({
    id: z.number().positive(),
  });

  static readonly READ_BY_ID: ZodType = z.object({
    id: z.number().positive(),
  });
}
