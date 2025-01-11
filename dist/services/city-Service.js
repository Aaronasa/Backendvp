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
exports.CityService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class CityService {
    createCity(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCity = yield prisma.city.create({
                data,
            });
            return newCity;
        });
    }
    getCityById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cityId = parseInt(id, 10); // Konversi id dari string ke number
                if (isNaN(cityId)) {
                    throw new Error('Invalid ID format. ID must be a number.');
                }
                const city = yield prisma.city.findUnique({
                    where: { id: cityId },
                });
                if (!city) {
                    console.log(`City with ID ${id} not found.`);
                    return null;
                }
                return city;
            }
            catch (error) {
                console.error(`Error fetching city with ID ${id}:`, error);
                throw new Error('Unable to fetch city.');
            }
        });
    }
    getAllCities() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cities = yield prisma.city.findMany(
                // include: { foods: true }, // Include related foods
                );
                console.log("All Cities: ", cities);
                return { data: cities };
            }
            catch (error) {
                console.error('Error fetching cities:', error);
                throw new Error('Unable to fetch cities.');
            }
        });
    }
    updateCity(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedCity = yield prisma.city.update({
                    where: { id },
                    data,
                });
                console.log(`City with ID ${id} updated successfully.`);
                return updatedCity;
            }
            catch (error) {
                console.error(`Error updating city with ID ${id}:`, error);
                // Handle specific error jika city tidak ditemukan
                if (error instanceof Error && error.code === "P2025") {
                    console.error(`City with ID ${id} does not exist.`);
                    return null;
                }
                throw new Error("Unable to update city.");
            }
        });
    }
    deleteCity(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedCity = yield prisma.city.delete({
                    where: { id },
                });
                console.log(`City with ID ${id} deleted successfully.`);
                return deletedCity;
            }
            catch (error) {
                console.error(`Error deleting city with ID ${id}:`, error);
                // Handle specific error if city not found
                if (error instanceof Error && error.code === "P2025") {
                    console.error(`City with ID ${id} does not exist.`);
                    return null;
                }
                throw new Error("Unable to delete city.");
            }
        });
    }
}
exports.CityService = CityService;
