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
exports.authMiddleware = void 0;
const response_error_1 = require("../Error/response-error");
const client_1 = require("@prisma/client");
const prismaClient = new client_1.PrismaClient();
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.get("x-API-Token"); // Get token from header
    console.log("authMiddleware: Token received:", token);
    if (!token) {
        console.error("No token provided in the request headers.");
        return next(new response_error_1.ResponseError(401, "No token provided"));
    }
    // Split token if it's comma-separated and take the first value
    if (token.includes(',')) {
        console.warn('authMiddleware: Multiple tokens detected:', token);
        token = token.split(',')[0].trim(); // Use the first token and trim whitespace
    }
    console.log('authMiddleware: Token after sanitization:', token);
    try {
        const user = yield prismaClient.user.findFirst({
            where: { token }, // Check token against database
            include: { role: true }, // Include role data
        });
        console.log("authMiddleware: User retrieved from database:", user);
        if (!user) {
            console.error(`Token mismatch. Received token: ${token}`);
            return next(new response_error_1.ResponseError(403, "You are not authorized to access this resource"));
        }
        req.user = user; // Attach user to request
        next(); // Proceed to next middleware/route
    }
    catch (error) {
        console.error("Error in authMiddleware:", error);
        next(new response_error_1.ResponseError(500, "Internal Server Error"));
    }
});
exports.authMiddleware = authMiddleware;
