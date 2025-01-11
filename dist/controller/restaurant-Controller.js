"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantController = void 0;
const restaurant_Service_1 = require("../services/restaurant-Service");
const restaurant_validation_1 = require("../validation/restaurant-validation");
class RestaurantController {
    static createRestaurant(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Uploaded file:", req.file);
                if (!req.file)
                    throw new Error('Image is required');
                const imagePath = req.file.filename;
                const request = Object.assign(Object.assign({}, restaurant_validation_1.RestaurantValidation.CREATE.parse(req.body)), { image: imagePath });
                console.log("Parsed request data:", request);
                const response = yield new restaurant_Service_1.RestaurantService().createRestaurant(request);
                const baseUrl = `${req.protocol}://${req.get("host")}`;
                response.image = `${baseUrl}/images/${response.image}`;
                res.status(201).json({
                    message: 'Restaurant successfully created.',
                    data: response,
                });
            }
            catch (error) {
                console.error(error);
                res.status(400).json({ error: error instanceof Error ? error.message : 'An error occurred while creating the restaurant.' });
            }
        });
    }
    static readRestaurantById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const params = restaurant_validation_1.RestaurantValidation.READ_BY_ID.parse({ id: parseInt(req.params.id, 10) });
                const restaurant = yield new restaurant_Service_1.RestaurantService().readRestaurantById(params.id);
                console.log("Backend Response:", {
                    id: restaurant.id,
                    name: restaurant.name,
                    address: restaurant.address,
                    phone: restaurant.phone,
                    image: restaurant.image
                });
                // Ensure the full image URL is included
                const baseUrl = `${req.protocol}://${req.get("host")}`;
                restaurant.image = `${baseUrl}/images/${restaurant.image}`;
                res.status(200).json({
                    message: "Restaurant by id successfully retrieved.",
                    data: restaurant,
                });
            }
            catch (error) {
                console.error("Error retrieving restaurant:", error);
                res.status(400).json({ error: "An error occurred while retrieving the restaurant." });
            }
        });
    }
    static readAllRestaurants(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield new restaurant_Service_1.RestaurantService().readAllRestaurants();
                const baseUrl = `${req.protocol}://${req.get('host')}`; // Dynamically build base URL
                const restaurantsWithImageURL = response.data.map((restaurant) => (Object.assign(Object.assign({}, restaurant), { image: `${baseUrl}/images/${restaurant.image}` })));
                res.status(200).json({
                    message: 'All restaurants successfully retrieved.',
                    data: restaurantsWithImageURL,
                });
            }
            catch (error) {
                console.error('Error fetching restaurants:', error);
                res.status(500).json({ error: 'An error occurred while retrieving restaurants.' });
            }
        });
    }
    static updateRestaurant(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const imagePath = req.file ? req.file.filename : undefined; // Save only the filename in the database
                const request = Object.assign(Object.assign({}, restaurant_validation_1.RestaurantValidation.UPDATE.parse(req.body)), (imagePath ? { image: imagePath } : {}));
                const response = yield new restaurant_Service_1.RestaurantService().updateRestaurant(request);
                res.status(200).json({
                    message: 'Restaurant successfully updated.',
                    data: response,
                });
            }
            catch (error) {
                console.error(error);
                res.status(400).json({ error: 'An error occurred while updating the restaurant.' });
            }
        });
    }
    static deleteRestaurant(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validate the request body
                const request = restaurant_validation_1.RestaurantValidation.DELETE.parse(req.body);
                // Proceed with service logic
                const response = yield new restaurant_Service_1.RestaurantService().deleteRestaurant(request);
                res.status(200).json({
                    message: "Restaurant successfully deleted.",
                    data: response,
                });
            }
            catch (error) {
                console.error(error);
                res.status(400).json({ error: 'An error occurred while deleting the restaurant.' });
            }
        });
    }
}
exports.RestaurantController = RestaurantController;
