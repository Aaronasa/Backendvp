"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidation = void 0;
const zod_1 = require("zod");
class ReviewValidation {
}
exports.ReviewValidation = ReviewValidation;
// Schema for creating a review
ReviewValidation.CREATE = zod_1.z.object({
    userId: zod_1.z.number().positive(), // Ensures userId is a positive number
    restaurantId: zod_1.z.number().positive(), // Ensures restaurantId is a positive number
    content: zod_1.z.string().min(10).max(500), // Content must be between 10 and 500 characters
    rating: zod_1.z.number().min(1).max(5), // Rating must be between 1 and 5
});
// Schema for updating a review
ReviewValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.number().positive(), // Review ID is required and must be positive
    content: zod_1.z.string().min(10).max(500).optional(), // Optional but must be between 10 and 500 characters if provided
    rating: zod_1.z.number().min(1).max(5).optional(), // Optional but must be between 1 and 5 if provided
});
// Schema for deleting a review
ReviewValidation.DELETE = zod_1.z.object({
    id: zod_1.z.number().positive(), // Review ID is required and must be positive
});
// Schema for reading a review by ID or restaurant ID
ReviewValidation.READ = zod_1.z.object({
    id: zod_1.z.number().positive().optional(), // Optional but must be positive if provided
    restaurantId: zod_1.z.number().positive().optional(), // Optional but must be positive if provided
});
