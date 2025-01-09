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
exports.FoodService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class FoodService {
    createFood(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newFood = yield prisma.food.create({
                data,
            });
            return newFood;
        });
    }
    readFoodById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const food = yield prisma.food.findUnique({
                where: { id },
                include: { category: true, city: true, foodRestaurants: true },
            });
            if (!food)
                throw new Error(`Food with ID ${id} not found`);
            return food;
        });
    }
    readAllFoods() {
        return __awaiter(this, void 0, void 0, function* () {
            const foods = yield prisma.food.findMany({
                include: { category: true, city: true, foodRestaurants: true },
            });
            return foods;
        });
    }
    updateFood(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedFood = yield prisma.food.update({
                where: { id: data.id },
                data,
            });
            return updatedFood;
        });
    }
    deleteFood(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedFood = yield prisma.food.delete({
                where: { id: data.id },
            });
            return deletedFood;
        });
    }
}
exports.FoodService = FoodService;
