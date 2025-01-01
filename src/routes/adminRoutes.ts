import { Router } from "express";
import { UserController } from "../controller/user-Controller";
import { adminMiddleware } from "../middlewares/admin-middleware"; // Optional: For admin-only routes
import { RestaurantController } from "../controller/restaurant-Controller";
import { ReviewController } from "../controller/review-Controller";

const router = Router();

// Admin Route: Read User (Can be customized further to only allow admin to view all users)
// You can add more routes for admin-only access
router.get("/admin/read", adminMiddleware, UserController.readUser);

router.post('/admin/restaurants/create', adminMiddleware, RestaurantController.createRestaurant);
router.get('/admin/restaurants/read', adminMiddleware, RestaurantController.readAllRestaurants);
router.get('/admin/restaurants/read/:id', adminMiddleware, RestaurantController.readRestaurantById);
router.put('/admin/restaurants/update', adminMiddleware, RestaurantController.updateRestaurant);
router.delete('/admin/restaurants/delete', adminMiddleware, RestaurantController.deleteRestaurant);

router.get("/admin/reviews", adminMiddleware, ReviewController.readAllReviews);
router.get("/admin/reviews/restaurant/:restaurantId", adminMiddleware, ReviewController.readReviewsByRestaurant);
router.put("/admin/reviews/update", adminMiddleware, ReviewController.updateReview);
router.delete("/admin/reviews/delete", adminMiddleware, ReviewController.deleteReview);

export default router;