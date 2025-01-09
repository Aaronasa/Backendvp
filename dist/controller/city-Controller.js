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
                if (!req.file) {
                    throw new Error("Image file is required.");
                }
                const imagePath = `/uploads/images/${req.file.filename}`;
                const request = city_validation_1.CityValidation.CREATE.parse(Object.assign(Object.assign({}, req.body), { image: imagePath }));
                const response = yield new city_Service_1.CityService().createCity(request);
                res.status(201).json({
                    message: "City successfully created.",
                    data: response,
                });
            }
            catch (error) {
                console.error(error);
                res.status(400).json({ error: error instanceof Error ? error.message : "An error occurred while creating the city." });
            }
        });
    }
    static readCityById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const params = city_validation_1.CityValidation.READ_BY_ID.parse({ id: parseInt(req.params.id, 10) });
                const response = yield new city_Service_1.CityService().readCityById(params.id);
                res.status(200).json({
                    message: "City successfully retrieved.",
                    data: response,
                });
            }
            catch (error) {
                console.error(error);
                res.status(400).json({ error: "An error occurred while retrieving the city." });
            }
        });
    }
    static readAllCities(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield new city_Service_1.CityService().readAllCities();
                res.status(200).json({
                    message: "All cities successfully retrieved.",
                    data: response,
                });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "An error occurred while retrieving cities." });
            }
        });
    }
    static updateCity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let imagePath = undefined;
                if (req.file) {
                    imagePath = `/uploads/images/${req.file.filename}`;
                }
                const request = city_validation_1.CityValidation.UPDATE.parse(Object.assign(Object.assign({}, req.body), (imagePath && { image: imagePath })));
                const response = yield new city_Service_1.CityService().updateCity(request);
                res.status(200).json({
                    message: "City successfully updated.",
                    data: response,
                });
            }
            catch (error) {
                console.error(error);
                res.status(400).json({ error: "An error occurred while updating the city." });
            }
        });
    }
    static deleteCity(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = city_validation_1.CityValidation.DELETE.parse(req.body);
                const response = yield new city_Service_1.CityService().deleteCity(request);
                res.status(200).json({
                    message: "City successfully deleted.",
                    data: response,
                });
            }
            catch (error) {
                console.error(error);
                res.status(400).json({ error: "An error occurred while deleting the city." });
            }
        });
    }
}
exports.CityController = CityController;
