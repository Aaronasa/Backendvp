"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityValidation = void 0;
const zod_1 = require("zod");
class CityValidation {
}
exports.CityValidation = CityValidation;
CityValidation.CREATE = zod_1.z.object({
    name: zod_1.z.string().min(3).max(100),
    image: zod_1.z.string().min(5).max(200)
});
CityValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.number().positive(),
    name: zod_1.z.string().min(3).max(100).optional(),
    image: zod_1.z.string().min(5).max(200).optional(),
});
CityValidation.DELETE = zod_1.z.object({
    id: zod_1.z.number().positive(),
});
CityValidation.READ_BY_ID = zod_1.z.object({
    id: zod_1.z.number().positive(),
});
