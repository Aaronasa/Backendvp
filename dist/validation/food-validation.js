"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodValidation = void 0;
const zod_1 = require("zod");
class FoodValidation {
}
exports.FoodValidation = FoodValidation;
FoodValidation.CREATE = zod_1.z.object({
    name: zod_1.z.string().min(3).max(100),
    description: zod_1.z.string().min(3).max(500),
    ingredients: zod_1.z.string().min(3).max(500),
    image: zod_1.z.string().optional(), // Optional, multer will handle this dynamically
    categoryId: zod_1.z.number().positive(),
    cityId: zod_1.z.number().positive(),
});
FoodValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.number().positive(),
    name: zod_1.z.string().min(3).max(100).optional(),
    description: zod_1.z.string().min(3).max(500).optional(),
    ingredients: zod_1.z.string().min(3).max(500).optional(),
    image: zod_1.z.string().optional(), // Optional for updates
    categoryId: zod_1.z.number().positive().optional(),
    cityId: zod_1.z.number().positive().optional(),
});
FoodValidation.DELETE = zod_1.z.object({
    id: zod_1.z.number().positive(),
});
FoodValidation.READ_BY_ID = zod_1.z.object({
    id: zod_1.z.number().positive(),
});
