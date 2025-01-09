"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantValidation = void 0;
const zod_1 = require("zod");
class RestaurantValidation {
}
exports.RestaurantValidation = RestaurantValidation;
// Schema for creating a restaurant
RestaurantValidation.CREATE = zod_1.z.object({
    name: zod_1.z.string().min(3).max(100),
    address: zod_1.z.string().min(5).max(200),
    phone: zod_1.z.string().regex(/^[0-9\-+]{9,15}$/),
    image: zod_1.z.string().optional(), // Will be handled dynamically
});
// Schema for updating a restaurant
RestaurantValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.number().positive(),
    name: zod_1.z.string().min(3).max(100).optional(),
    address: zod_1.z.string().min(5).max(200).optional(),
    phone: zod_1.z.string().regex(/^[0-9\-+]{9,15}$/).optional(),
    image: zod_1.z.string().optional(),
});
// Schema for deleting a restaurant
RestaurantValidation.DELETE = zod_1.z.object({
    id: zod_1.z.number().positive(),
});
// Schema for reading a restaurant by ID
RestaurantValidation.READ_BY_ID = zod_1.z.object({
    id: zod_1.z.number().positive(),
});
