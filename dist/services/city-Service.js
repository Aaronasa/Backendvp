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
    readCityById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const city = yield prisma.city.findUnique({
                where: { id },
                include: { foods: true }, // Adjust if foods relations are needed
            });
            if (!city)
                throw new Error(`City with ID ${id} not found`);
            return city;
        });
    }
    readAllCities() {
        return __awaiter(this, void 0, void 0, function* () {
            const cities = yield prisma.city.findMany({
                include: { foods: true }, // Adjust if foods relations are needed
            });
            return cities;
        });
    }
    updateCity(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedCity = yield prisma.city.update({
                where: { id: data.id },
                data,
            });
            return updatedCity;
        });
    }
    deleteCity(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedCity = yield prisma.city.delete({
                where: { id: data.id },
            });
            return deletedCity;
        });
    }
}
exports.CityService = CityService;
