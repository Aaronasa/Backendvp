"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
class UserValidation {
}
exports.UserValidation = UserValidation;
// Schema for creating a user
UserValidation.CREATE = zod_1.z.object({
    username: zod_1.z.string().min(3).max(100),
    email: zod_1.z.string().email().max(150),
    password: zod_1.z.string().min(6).max(100),
    roleId: zod_1.z.number().positive(),
});
// Schema for updating a user
UserValidation.UPDATE = zod_1.z.object({
    id: zod_1.z.number().positive(),
    username: zod_1.z.string().min(3).max(100).optional(),
    email: zod_1.z.string().email().max(150).optional(),
    password: zod_1.z.string().min(6).max(100).optional(),
    token: zod_1.z.string().max(100).optional(),
    roleId: zod_1.z.number().positive().optional(),
});
// Schema for deleting a user
UserValidation.DELETE = zod_1.z.object({
    id: zod_1.z.number().positive(),
});
// Schema for reading a user
UserValidation.READ = zod_1.z.object({
    id: zod_1.z.number().positive().optional(),
});
// Schema for login
UserValidation.LOGIN = zod_1.z.object({
    email: zod_1.z.string().email().max(150),
    password: zod_1.z.string().min(6).max(100),
});
