"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = void 0;
const response_error_1 = require("../Error/response-error");
const client_1 = require("@prisma/client");
const prismaClient = new client_1.PrismaClient();
const adminMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let token = req.get("x-API-Token"); // Get token from header
    console.log("adminMiddleware: Token received:", token);
    if (!token) {
        console.error("No token provided in the request headers.");
        return next(new response_error_1.ResponseError(401, "No token provided"));
    }
    // Split token if it's comma-separated and take the first value
    if (token.includes(",")) {
        console.warn("adminMiddleware: Multiple tokens detected:", token);
        token = token.split(",")[0].trim(); // Use the first token and trim whitespace
    }
    console.log("adminMiddleware: Token after sanitization:", token);
    try {
        const user = yield prismaClient.user.findFirst({
            where: { token }, // Check token against database
            include: { role: true }, // Include role data to validate admin role
        });
        console.log("adminMiddleware: User retrieved from database:", user);
        if (!user) {
            console.error(`Token mismatch or user not found. Received token: ${token}`);
            return next(new response_error_1.ResponseError(403, "You are not authorized to access this resource"));
        }
        // Check if the user's role is "admin"
        if (!user.role || user.role.name !== "admin") {
            console.error(`Access denied. User is not an admin. User role: ${(_a = user.role) === null || _a === void 0 ? void 0 : _a.name}`);
            return next(new response_error_1.ResponseError(403, "Access denied. Admins only."));
        }
        // Attach user to request and proceed
        req.user = user;
        next();
    }
    catch (error) {
        console.error("Error in adminMiddleware:", error);
        next(new response_error_1.ResponseError(500, "Internal Server Error"));
    }
});
exports.adminMiddleware = adminMiddleware;
