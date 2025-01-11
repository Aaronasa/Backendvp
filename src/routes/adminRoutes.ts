import { Router } from "express";
import { UserController } from "../controller/user-Controller";
import { adminMiddleware } from "../middlewares/admin-middleware"; // Optional: For admin-only routes
import { RestaurantController } from "../controller/restaurant-Controller";
import { ReviewController } from "../controller/review-Controller";
import { CityController } from "../controller/city-Controller";
import { CategoryController } from "../controller/category-controller";
import { FoodController } from "../controller/food-Controller";
import { FoodRestaurantController } from "../controller/foodRestaurant-Controller";
import { upload } from "../middlewares/multer-middleware";



const router = Router();

// Admin Route: Read User (Can be customized further to only allow admin to view all users)
// You can add more routes for admin-only access
router.get("/read", adminMiddleware, UserController.readAllUsers);

router.post('/restaurants/create', adminMiddleware, upload.single('image'), RestaurantController.createRestaurant);
router.get('/restaurants/read', adminMiddleware, RestaurantController.readAllRestaurants);
router.get('/restaurants/read/:id', adminMiddleware, RestaurantController.readRestaurantById);
router.put('/restaurants/update/:id', adminMiddleware, upload.single('image'), RestaurantController.updateRestaurant);
router.delete('/restaurants/delete/:id', adminMiddleware, RestaurantController.deleteRestaurant);

router.post("/reviews/Create", adminMiddleware, ReviewController.createReview);
router.get("/reviews/readall", adminMiddleware, ReviewController.readAllReviews);
router.get("/reviews/restaurant/:restaurantId", adminMiddleware, ReviewController.readReviewsByRestaurant);
router.get("/reviews/read/:id", adminMiddleware, ReviewController.readReviewsById);
router.put("/reviews/update/:id", adminMiddleware, ReviewController.updateReview);
router.delete("/reviews/delete/:id", adminMiddleware, ReviewController.deleteReview);

router.post("/city/create", adminMiddleware, upload.single("image"), CityController.createCity);
router.get("/city/readall", adminMiddleware, CityController.readAllCities);
router.get("/city/:id", adminMiddleware, CityController.readCityById);
router.put("/city/update/:id", adminMiddleware, upload.single('image'), CityController.updateCity);

router.post("/category/create", adminMiddleware, CategoryController.createCategory);
router.get("/category/read/:id", adminMiddleware, CategoryController.readCategoryById);
router.get("/category/readall", adminMiddleware, CategoryController.readAllCategories);
router.put("/category/update", adminMiddleware, CategoryController.updateCategory);
router.delete("/category/delete", adminMiddleware, CategoryController.deleteCategory);

router.post("/food/create", adminMiddleware, upload.single("image"), FoodController.createFood);
router.get("/food/read/:id", adminMiddleware, FoodController.readFoodById);
router.get("/food/readall", adminMiddleware, FoodController.readAllFoods);
router.put("/food/update", adminMiddleware, upload.single("image"), FoodController.updateFood);
router.delete("/food/delete", adminMiddleware, FoodController.deleteFood);

router.post("/foodrestaurant/create", adminMiddleware, FoodRestaurantController.createFoodRestaurant);
router.get("/foodrestaurant/read/:id", adminMiddleware, FoodRestaurantController.readFoodRestaurantById);
router.get("/foodrestaurant/readall", adminMiddleware, FoodRestaurantController.readAllFoodRestaurants);
router.put("/foodrestaurant/update", adminMiddleware, FoodRestaurantController.updateFoodRestaurant);
router.delete("/foodrestaurant/delete", adminMiddleware, FoodRestaurantController.deleteFoodRestaurant);

export default router;