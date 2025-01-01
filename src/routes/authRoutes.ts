import { Router } from "express";
import { UserController } from "../controller/user-Controller";
import { authMiddleware } from "../middlewares/auth-middleware"; // Optional: If you need auth protection
import { RestaurantController } from "../controller/restaurant-Controller";
import { ReviewController } from "../controller/review-Controller";
import { CityController } from "../controller/city-Controller";
import { CategoryController } from "../controller/category-controller";

const router = Router();

// Protected Route: Update User (Requires Auth)
router.put("/update", authMiddleware, UserController.updateUser);

// Protected Route: Delete User (Requires Auth)
router.delete("/delete", authMiddleware, UserController.deleteUser);

router.post("/logout", UserController.logout);

router.post('/restaurants/create', authMiddleware, RestaurantController.createRestaurant);
router.get('/restaurants/read', authMiddleware, RestaurantController.readAllRestaurants);
router.get('/restaurants/read/:id', authMiddleware, RestaurantController.readRestaurantById);

router.post("/reviews/Create", authMiddleware, ReviewController.createReview);
router.get("/reviews/readall", authMiddleware, ReviewController.readAllReviews);
router.get("/reviews/restaurant/:restaurantId", authMiddleware, ReviewController.readReviewsByRestaurant);
router.put("/reviews/update/:id", authMiddleware, ReviewController.updateReview);

router.post("/city/create",authMiddleware, CityController.createCity);
router.get("/city/read/:id",authMiddleware, CityController.readCityById);
router.get("/city/readall", authMiddleware, CityController.readAllCities);

router.post("/category/create", authMiddleware, CategoryController.createCategory);
router.get("/category/read/:id", authMiddleware, CategoryController.readCategoryById);
router.get("/category/readall", authMiddleware, CategoryController.readAllCategories);
router.put("/category/update", authMiddleware, CategoryController.updateCategory);

export default router;
