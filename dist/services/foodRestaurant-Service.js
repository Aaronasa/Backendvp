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
exports.FoodRestaurantService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class FoodRestaurantService {
    createFoodRestaurant(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newFoodRestaurant = yield prisma.foodRestaurant.create({
                data,
            });
            return newFoodRestaurant;
        });
    }
    readFoodRestaurantById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const foodRestaurant = yield prisma.foodRestaurant.findUnique({
                where: { id },
                include: { food: true, restaurant: true },
            });
            if (!foodRestaurant)
                throw new Error(`FoodRestaurant with ID ${id} not found`);
            return foodRestaurant;
        });
    }
    readAllFoodRestaurants() {
        return __awaiter(this, void 0, void 0, function* () {
            const foodRestaurants = yield prisma.foodRestaurant.findMany({
                include: { food: true, restaurant: true },
            });
            return foodRestaurants;
        });
    }
    updateFoodRestaurant(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedFoodRestaurant = yield prisma.foodRestaurant.update({
                where: { id: data.id },
                data,
            });
            return updatedFoodRestaurant;
        });
    }
    deleteFoodRestaurant(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedFoodRestaurant = yield prisma.foodRestaurant.delete({
                where: { id: data.id },
            });
            return deletedFoodRestaurant;
        });
    }
}
exports.FoodRestaurantService = FoodRestaurantService;
