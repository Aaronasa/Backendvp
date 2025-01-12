import { z, ZodType } from "zod";

export class ReviewValidation {
  // Schema for creating a review
  static readonly CREATE: ZodType = z.object({
    userId: z.number().positive(), // Ensures userId is a positive number
    restaurantId: z.number().positive(), // Ensures restaurantId is a positive number
    content: z.string().min(10).max(500), // Content must be between 10 and 500 characters
    rating: z.number().min(1).max(5), // Rating must be between 1 and 5
  });

  // Schema for updating a review
  static readonly UPDATE: ZodType = z.object({
    id: z.number().positive(), // Review ID is required and must be positive
    content: z.string().min(10).max(500).optional(), // Optional but must be between 10 and 500 characters if provided
    rating: z.number().min(1).max(5).optional(), // Optional but must be between 1 and 5 if provided
  });

  // Schema for deleting a review
  static readonly DELETE: ZodType = z.object({
    id: z.number().positive(), // Review ID is required and must be positive
  });

  // Schema for reading a review by ID or restaurant ID
  static readonly READ: ZodType = z.object({
    id: z.number().positive().optional(), // Optional but must be positive if provided
    restaurantId: z.number().positive().optional(), // Optional but must be positive if provided
  });

  static readonly READ_BY_ID: ZodType = z.object({
    id: z.number().positive(),
  });
}
