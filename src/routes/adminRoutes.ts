import { Router } from "express";
import { UserController } from "../controller/user-Controller";
import { adminMiddleware } from "../middlewares/admin-middleware"; // Optional: For admin-only routes

const router = Router();

// Admin Route: Read User (Can be customized further to only allow admin to view all users)
// You can add more routes for admin-only access
router.get("/admin/read", adminMiddleware, UserController.readUser);

export default router;