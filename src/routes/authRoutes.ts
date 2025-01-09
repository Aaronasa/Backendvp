import { Router } from "express";
import { UserController } from "../controller/user-Controller";
import { authMiddleware } from "../middlewares/auth-middleware"; // Optional: If you need auth protection
import { RestaurantController } from "../controller/restaurant-Controller";
import { ReviewController } from "../controller/review-Controller";
import { CityController } from "../controller/city-Controller";
import { CategoryController } from "../controller/category-controller";
import { FoodController } from "../controller/food-Controller";
import { FoodRestaurantController } from "../controller/foodRestaurant-Controller";
import { upload } from "../middlewares/multer-middleware";

const router = Router();

// // Protected Route: Update User (Requires Auth)
// router.put("/update", authMiddleware, UserController.updateUser);

// // Protected Route: Delete User (Requires Auth)
// router.delete("/delete", authMiddleware, UserController.deleteUser);


// router.post("/logout", UserController.logout);


router.post('/create', UserController.createUser);


router.get('/read/all', authMiddleware, UserController.readAllUsers);
router.post('/read', authMiddleware, UserController.readUserByToken);
router.put('/update/user', authMiddleware, UserController.updateUser);
router.post('/logout', authMiddleware, UserController.logout)
router.put('/update', authMiddleware, UserController.updateUser);
router.delete('/delete', authMiddleware, UserController.deleteUser);

router.post('/restaurants/create', authMiddleware, upload.single('image'), RestaurantController.createRestaurant);
router.get('/restaurants/read', authMiddleware, RestaurantController.readAllRestaurants);
router.get('/restaurants/read/:id', authMiddleware, RestaurantController.readRestaurantById);  
router.put('/restaurants/update', authMiddleware, upload.single('image'), RestaurantController.updateRestaurant); 
router.delete('/restaurants/delete', authMiddleware, RestaurantController.deleteRestaurant);

router.post("/reviews/Create", authMiddleware, ReviewController.createReview);
router.get("/reviews/readall", authMiddleware, ReviewController.readAllReviews);
router.get("/reviews/restaurant/:restaurantId", authMiddleware, ReviewController.readReviewsByRestaurant);
router.put("/reviews/update/:id", authMiddleware, ReviewController.updateReview);
router.delete("/reviews/delete", authMiddleware, ReviewController.deleteReview);

router.post("/city/create",authMiddleware, upload.single('image'), CityController.createCity);
router.get("/city/read/:id",authMiddleware, CityController.readCityById);
router.get("/city/readall", authMiddleware, CityController.readAllCities);

router.post("/category/create", authMiddleware, CategoryController.createCategory);
router.get("/category/read/:id", authMiddleware, CategoryController.readCategoryById);
router.get("/category/readall", authMiddleware, CategoryController.readAllCategories);

router.post("/food/create", authMiddleware, FoodController.createFood);
router.get("/food/read/:id", authMiddleware, FoodController.readFoodById);
router.get("/food/readall", authMiddleware, FoodController.readAllFoods);

router.post("/foodrestaurant/create", authMiddleware, FoodRestaurantController.createFoodRestaurant);
router.get("/foodrestaurant/read/:id", authMiddleware, FoodRestaurantController.readFoodRestaurantById);
router.get("/foodrestaurant/readall", authMiddleware, FoodRestaurantController.readAllFoodRestaurants);
router.put("/foodrestaurant/update", authMiddleware, FoodRestaurantController.updateFoodRestaurant);

export default router;
