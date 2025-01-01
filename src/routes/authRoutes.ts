import { Router } from "express";
import { UserController } from "../controller/user-Controller";
import { authMiddleware } from "../middlewares/auth-middleware"; // Optional: If you need auth protection

const router = Router();

// Protected Route: Update User (Requires Auth)
router.put("/update", authMiddleware, UserController.updateUser);

// Protected Route: Delete User (Requires Auth)
router.delete("/delete", authMiddleware, UserController.deleteUser);

router.post("/logout", UserController.logout);

export default router;
