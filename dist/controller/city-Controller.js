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
exports.CityController = void 0;
const city_Service_1 = require("../services/city-Service");
const city_validation_1 = require("../validation/city-validation");
class CityController {
    static createCity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.file)
                    throw new Error("Image is required");
                const imagePath = req.file.filename;
                const request = Object.assign(Object.assign({}, city_validation_1.CityValidation.CREATE.parse(req.body)), { image: imagePath });
                const response = yield new city_Service_1.CityService().createCity(request);
                res.status(201).json({
                    message: "City successfully created.",
                    data: response,
                });
            }
            catch (error) {
                console.error(error);
                res
                    .status(400)
                    .json({
                    error: error instanceof Error
                        ? error.message
                        : "An error occurred while creating the restaurant.",
                });
            }
        });
    }
    static readAllCities(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield new city_Service_1.CityService().getAllCities();
                const baseUrl = `${req.protocol}://${req.get("host")}`; // Dynamically build base URL
                const restaurantsWithImageURL = response.data.map((city) => (Object.assign(Object.assign({}, city), { image: `${baseUrl}/images/${city.image}` })));
                res.status(200).json({
                    message: "All restaurants successfully retrieved.",
                    data: restaurantsWithImageURL,
                });
            }
            catch (error) {
                console.error("Error fetching restaurants:", error);
                res
                    .status(500)
                    .json({ error: "An error occurred while retrieving restaurants." });
            }
        });
    }
    static readCityById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const city = yield new city_Service_1.CityService().getCityById(id);
                if (!city) {
                    res.status(404).json({
                        message: "City not found.",
                    });
                    return;
                }
                const baseUrl = `${req.protocol}://${req.get("host")}`; // Dynamically build base URL
                const cityWithImageURL = Object.assign(Object.assign({}, city), { image: `${baseUrl}/images/${city.image}` });
                res.status(200).json({
                    message: "City successfully retrieved.",
                    data: cityWithImageURL,
                });
            }
            catch (error) {
                console.error("Error fetching city by ID:", error);
                res.status(500).json({
                    error: "An error occurred while retrieving the city.",
                });
            }
        });
    }
    static updateCity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id, 10); // Konversi ID dari string ke number
                if (isNaN(id)) {
                    throw new Error("Invalid ID format. ID must be a number.");
                }
                const imagePath = req.file ? req.file.filename : undefined;
                const updateData = Object.assign(Object.assign({}, city_validation_1.CityValidation.UPDATE.parse(req.body)), (imagePath && { image: imagePath }));
                const updatedCity = yield new city_Service_1.CityService().updateCity(id, updateData);
                if (!updatedCity) {
                    res.status(404).json({ message: "City not found." });
                    return;
                }
                res.status(200).json({
                    message: "City successfully updated.",
                    data: updatedCity,
                });
            }
            catch (error) {
                console.error("Error updating city:", error);
                res.status(400).json({
                    error: error instanceof Error ? error.message : "An error occurred.",
                });
            }
        });
    }
    static deleteCity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id, 10); // Convert ID from string to number
                if (isNaN(id)) {
                    throw new Error("Invalid ID format. ID must be a number.");
                }
                const deletedCity = yield new city_Service_1.CityService().deleteCity(id);
                if (!deletedCity) {
                    res.status(404).json({ message: "City not found." });
                    return;
                }
                res.status(200).json({
                    message: "City successfully deleted.",
                });
            }
            catch (error) {
                console.error("Error deleting city:", error);
                res.status(400).json({
                    error: error instanceof Error ? error.message : "An error occurred.",
                });
            }
        });
    }
}
exports.CityController = CityController;
