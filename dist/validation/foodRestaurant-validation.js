"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodRestaurantValidation = void 0;
const zod_1 = require("zod");
class FoodRestaurantValidation {
}
exports.FoodRestaurantValidation = FoodRestaurantValidation;
FoodRestaurantValidation.CREATE = zod_1.z.object({
    foodId: zod_1.z.number().positive(),
    restaurantId: zod_1.z.number().positive(),
    price: zod_1.z.number().positive(),
});
FoodRestaurantValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.number().positive(),
    foodId: zod_1.z.number().positive().optional(),
    restaurantId: zod_1.z.number().positive().optional(),
    price: zod_1.z.number().positive().optional(),
});
FoodRestaurantValidation.DELETE = zod_1.z.object({
    id: zod_1.z.number().positive(),
});
FoodRestaurantValidation.READ_BY_ID = zod_1.z.object({
    id: zod_1.z.number().positive(),
});
