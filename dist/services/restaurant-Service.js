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
exports.RestaurantService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class RestaurantService {
    createRestaurant(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Data being saved to the database:", data);
                const newRestaurant = yield prisma.restaurant.create({ data });
                console.log("Database response:", newRestaurant);
                return newRestaurant;
            }
            catch (error) {
                console.error("Error creating restaurant in DB:", error);
                throw new Error("Database operation failed");
            }
        });
    }
    readRestaurantById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Service: Fetching restaurant with ID:", id); // Log the input ID
                const restaurant = yield prisma.restaurant.findUnique({
                    where: { id },
                    // include: {
                    //    reviews: true, foodRestaurants: true 
                    //   },
                });
                if (!restaurant) {
                    console.warn("Service: No restaurant found with ID:", id); // Log if no result is found
                    throw new Error(`Restaurant with ID ${id} not found`);
                }
                console.log("Service: Successfully fetched by id restaurant:", restaurant); // Log the result
                return restaurant;
            }
            catch (error) {
                console.error("Service Error: Failed to fetch restaurant by ID:", error); // Log the error
                throw new Error("Failed to fetch restaurant by ID");
            }
        });
    }
    readAllRestaurants() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Service: Starting to fetch all restaurants from the database");
                const restaurants = yield prisma.restaurant.findMany(
                //   {
                //     include: { reviews: true, foodRestaurants: true },
                // }
                );
                console.log("Service: Successfully fetched all restaurants:", restaurants);
                return { data: restaurants };
            }
            catch (error) {
                console.error("Service Error: Failed to fetch all restaurants:", error);
                throw new Error("Failed to fetch restaurants");
            }
        });
    }
    updateRestaurant(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedRestaurant = yield prisma.restaurant.update({
                where: { id: data.id },
                data,
            });
            return updatedRestaurant;
        });
    }
    deleteRestaurant(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Deleting restaurant with ID:", data.id);
                const deletedRestaurant = yield prisma.restaurant.delete({
                    where: { id: data.id },
                });
                console.log("Deleted restaurant:", deletedRestaurant);
                return deletedRestaurant;
            }
            catch (error) {
                console.error("Error deleting restaurant:", error);
                throw new Error("Failed to delete restaurant");
            }
        });
    }
}
exports.RestaurantService = RestaurantService;
