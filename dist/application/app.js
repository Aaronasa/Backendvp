"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const publicRoutes_1 = __importDefault(require("../routes/publicRoutes"));
const authRoutes_1 = __importDefault(require("../routes/authRoutes"));
const adminRoutes_1 = __importDefault(require("../routes/adminRoutes"));
const error_middleware_1 = require("../middlewares/error-middleware");
const path_1 = __importDefault(require("path"));
// import { protectedRouter } from "../routers/protected-router";
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/public', publicRoutes_1.default); // Use the publicRouter directly
// app.use(protectedRouter); // You can uncomment if you have protected routes
app.use(error_middleware_1.errorMiddleware); // Error handling middleware
app.use('/auth', authRoutes_1.default);
app.use('/admin', adminRoutes_1.default);
console.log('Serving static files from:', path_1.default.join(process.cwd(), 'src', 'middlewares', 'uploads', 'images'));
app.use('/uploads/images', express_1.default.static(path_1.default.join(process.cwd(), 'src', 'middlewares', 'uploads', 'images')));
exports.default = app;
