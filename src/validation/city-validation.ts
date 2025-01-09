import { z, ZodType } from "zod";

export class CityValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(3).max(100),
    image: z.string().optional()
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.number().positive(),
    name: z.string().min(3).max(100).optional(),
    image: z.string().min(5).max(200).optional(),
  });

  static readonly DELETE: ZodType = z.object({
    id: z.number().positive(),
  });

  static readonly READ_BY_ID: ZodType = z.object({
    id: z.number().positive(),
  });
}
