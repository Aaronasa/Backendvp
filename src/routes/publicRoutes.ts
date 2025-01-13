import { Router } from "express";
import { UserController } from "../controller/user-Controller";
import { adminMiddleware } from "../middlewares/admin-middleware"; // Optional: For admin-only routes

const router = Router();

// Public Route: Create User
router.post("/create", UserController.createUser);

router.post("/login", UserController.login);

export default router;
