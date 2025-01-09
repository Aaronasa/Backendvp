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
exports.FoodRestaurantController = void 0;
const foodRestaurant_Service_1 = require("../services/foodRestaurant-Service");
const foodRestaurant_validation_1 = require("../validation/foodRestaurant-validation");
class FoodRestaurantController {
    static createFoodRestaurant(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Validate the request body
                const request = foodRestaurant_validation_1.FoodRestaurantValidation.CREATE.parse(req.body);
                // Proceed with service logic
                const response = yield new foodRestaurant_Service_1.FoodRestaurantService().createFoodRestaurant(request);
                res.status(201).json({
                    message: "FoodRestaurant successfully created.",
                    data: response,
                });
            }
            catch (error) {
                console.error(error);
                res.status(400).json({ error: error instanceof Error ? error.message : "An error occurred while creating the food restaurant." });
            }
        });
    }
    static readFoodRestaurantById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const params = foodRestaurant_validation_1.FoodRestaurantValidation.READ_BY_ID.parse({ id: parseInt(req.params.id, 10) });
                const response = yield new foodRestaurant_Service_1.FoodRestaurantService().readFoodRestaurantById(params.id);
                res.status(200).json({
                    message: "FoodRestaurant successfully retrieved.",
                    data: response,
                });
            }
            catch (error) {
                console.error(error);
                res.status(400).json({ error: 'An error occurred while retrieving the food restaurant.' });
            }
        });
    }
    static readAllFoodRestaurants(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield new foodRestaurant_Service_1.FoodRestaurantService().readAllFoodRestaurants();
                res.status(200).json({
                    message: 'All food restaurants successfully retrieved.',
                    data: response,
                });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: 'An error occurred while retrieving food restaurants.' });
            }
        });
    }
    static updateFoodRestaurant(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = foodRestaurant_validation_1.FoodRestaurantValidation.UPDATE.parse(req.body);
                const response = yield new foodRestaurant_Service_1.FoodRestaurantService().updateFoodRestaurant(request);
                res.status(200).json({
                    message: "FoodRestaurant successfully updated.",
                    data: response,
                });
            }
            catch (error) {
                console.error(error);
                res.status(400).json({ error: 'An error occurred while updating the food restaurant.' });
            }
        });
    }
    static deleteFoodRestaurant(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = foodRestaurant_validation_1.FoodRestaurantValidation.DELETE.parse(req.body);
                const response = yield new foodRestaurant_Service_1.FoodRestaurantService().deleteFoodRestaurant(request);
                res.status(200).json({
                    message: "FoodRestaurant successfully deleted.",
                    data: response,
                });
            }
            catch (error) {
                console.error(error);
                res.status(400).json({ error: 'An error occurred while deleting the food restaurant.' });
            }
        });
    }
}
exports.FoodRestaurantController = FoodRestaurantController;
