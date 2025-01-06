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
exports.FoodController = void 0;
const food_Service_1 = require("../services/food-Service");
const food_validation_1 = require("../validation/food-validation");
class FoodController {
    static createFood(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                // Get the uploaded file path
                const imagePath = ((_a = req.file) === null || _a === void 0 ? void 0 : _a.path) || "";
                // Validate the request body
                const requestData = Object.assign(Object.assign({}, req.body), { image: imagePath });
                const request = food_validation_1.FoodValidation.CREATE.parse(requestData);
                // Proceed with service logic
                const response = yield new food_Service_1.FoodService().createFood(request);
                res.status(201).json({
                    message: "Food successfully created.",
                    data: response,
                });
            }
            catch (error) {
                console.error(error);
                res.status(400).json({
                    error: error instanceof Error
                        ? error.message
                        : "An error occurred while creating the food.",
                });
            }
        });
    }
    static readFoodById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const params = food_validation_1.FoodValidation.READ_BY_ID.parse({
                    id: parseInt(req.params.id, 10),
                });
                const response = yield new food_Service_1.FoodService().readFoodById(params.id);
                res.status(200).json({
                    message: "Food successfully retrieved.",
                    data: response,
                });
            }
            catch (error) {
                console.error(error);
                res
                    .status(400)
                    .json({ error: "An error occurred while retrieving the food." });
            }
        });
    }
    static readAllFoods(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield new food_Service_1.FoodService().readAllFoods();
                res.status(200).json({
                    message: "All foods successfully retrieved.",
                    data: response,
                });
            }
            catch (error) {
                console.error(error);
                res
                    .status(500)
                    .json({ error: "An error occurred while retrieving foods." });
            }
        });
    }
    static updateFood(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                // Get the uploaded file path
                const imagePath = ((_a = req.file) === null || _a === void 0 ? void 0 : _a.path) || "";
                // Validate the request body
                const requestData = Object.assign(Object.assign({}, req.body), { image: imagePath || req.body.image });
                const request = food_validation_1.FoodValidation.UPDATE.parse(requestData);
                // Proceed with service logic
                const response = yield new food_Service_1.FoodService().updateFood(request);
                res.status(200).json({
                    message: "Food successfully updated.",
                    data: response,
                });
            }
            catch (error) {
                console.error(error);
                res
                    .status(400)
                    .json({ error: "An error occurred while updating the food." });
            }
        });
    }
    static deleteFood(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = food_validation_1.FoodValidation.DELETE.parse(req.body);
                const response = yield new food_Service_1.FoodService().deleteFood(request);
                res.status(200).json({
                    message: "Food successfully deleted.",
                    data: response,
                });
            }
            catch (error) {
                console.error(error);
                res
                    .status(400)
                    .json({ error: "An error occurred while deleting the food." });
            }
        });
    }
}
exports.FoodController = FoodController;
