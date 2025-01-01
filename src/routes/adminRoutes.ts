import { Router } from "express";
import { UserController } from "../controller/user-Controller";
import { adminMiddleware } from "../middlewares/admin-middleware"; // Optional: For admin-only routes
import { RestaurantController } from "../controller/restaurant-Controller";
import { ReviewController } from "../controller/review-Controller";
import { CityController } from "../controller/city-Controller";


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


export default router;