import { Router } from "express";
import { UserController } from "../controller/user-Controller";
import { adminMiddleware } from "../middlewares/admin-middleware"; // Optional: For admin-only routes
import { RestaurantController } from "../controller/restaurant-Controller";
import { ReviewController } from "../controller/review-Controller";
import { CityController } from "../controller/city-Controller";
import { CategoryController } from "../controller/category-controller";
import { FoodController } from "../controller/food-Controller";



const router = Router();

// Admin Route: Read User (Can be customized further to only allow admin to view all users)
// You can add more routes for admin-only access
router.get("/read", adminMiddleware, UserController.readUser);

router.post('/restaurants/create', adminMiddleware, RestaurantController.createRestaurant);
router.get('/restaurants/read', adminMiddleware, RestaurantController.readAllRestaurants);
router.get('/restaurants/read/:id', adminMiddleware, RestaurantController.readRestaurantById);
router.put('/restaurants/update', adminMiddleware, RestaurantController.updateRestaurant);
router.delete('/restaurants/delete', adminMiddleware, RestaurantController.deleteRestaurant);

router.get("/reviews/readall", adminMiddleware, ReviewController.readAllReviews);
router.get("/reviews/restaurant/:restaurantId", adminMiddleware, ReviewController.readReviewsByRestaurant);
router.put("/reviews/update", adminMiddleware, ReviewController.updateReview);
router.delete("/reviews/delete", adminMiddleware, ReviewController.deleteReview);

router.post("/city/create",adminMiddleware, CityController.createCity);
router.get("/city/read/:id",adminMiddleware, CityController.readCityById);
router.get("/cities/readall", adminMiddleware, CityController.readAllCities);
router.put("/city/update", adminMiddleware, CityController.updateCity);
router.delete("/city/delete", adminMiddleware, CityController.deleteCity);

router.post("/category/create", adminMiddleware, CategoryController.createCategory);
router.get("/category/read/:id", adminMiddleware, CategoryController.readCategoryById);
router.get("/category/readall", adminMiddleware, CategoryController.readAllCategories);
router.put("/category/update", adminMiddleware, CategoryController.updateCategory);
router.delete("/category/delete", adminMiddleware, CategoryController.deleteCategory);

router.post("/food/create", adminMiddleware, FoodController.createFood);
router.get("/food/read/:id", adminMiddleware, FoodController.readFoodById);
router.get("/food/readall", adminMiddleware, FoodController.readAllFoods);
router.put("/food/update", adminMiddleware, FoodController.updateFood);
router.delete("/food/delete", adminMiddleware, FoodController.deleteFood);

export default router;