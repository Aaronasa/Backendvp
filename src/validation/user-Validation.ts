import { z, ZodType } from "zod";

export class UserValidation {
  // Schema for creating a user
  static readonly CREATE: ZodType = z.object({
    username: z.string().min(3).max(100),
    email: z.string().email().max(150),
    password: z.string().min(6).max(100),
    roleId: z.number().positive(),
  });

  // Schema for updating a user
  static readonly UPDATE: ZodType = z.object({
    id: z.number().positive(),
    username: z.string().min(3).max(100).optional(),
    email: z.string().email().max(150).optional(),
    password: z.string().min(6).max(100).optional(),
    token: z.string().max(100).optional(),
    roleId: z.number().positive().optional(),
  });

  // Schema for deleting a user
  static readonly DELETE: ZodType = z.object({
    id: z.number().positive(),
  });

  // Schema for reading a user
  static readonly READ: ZodType = z.object({
    id: z.number().positive().optional(),
  });

  // Schema for login
  static readonly LOGIN: ZodType = z.object({
    email: z.string().email().max(150),
    password: z.string().min(6).max(100),
  });
}
