import { Router } from "express";
import { UserController } from "../controller/user-Controller";
import { adminMiddleware } from "../middlewares/admin-middleware"; // Optional: For admin-only routes

const router = Router();

// Public Route: Create User
router.post("/create", UserController.createUser);

// Public Route: Read User (can be with query params to fetch specific user)
// router.get("/read", UserController.readUser);

router.post("/login", UserController.login);

export default router;
