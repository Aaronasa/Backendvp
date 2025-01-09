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
exports.ReviewService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ReviewService {
    createReview(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newReview = yield prisma.review.create({
                data,
            });
            return newReview;
        });
    }
    readReview(query) {
        return __awaiter(this, void 0, void 0, function* () {
            if (query.id) {
                // Fetch review by ID
                const review = yield prisma.review.findUnique({
                    where: { id: query.id },
                    include: { user: true, restaurant: true },
                });
                if (!review)
                    throw new Error(`Review with ID ${query.id} not found`);
                return review;
            }
            else if (query.restaurantId) {
                // Fetch reviews by restaurant ID
                const reviews = yield prisma.review.findMany({
                    where: { restaurantId: query.restaurantId },
                    include: { user: true, restaurant: true },
                });
                return reviews;
            }
            else {
                // Fetch all reviews
                const reviews = yield prisma.review.findMany({
                    include: { user: true, restaurant: true },
                });
                return reviews;
            }
        });
    }
    updateReview(data) {
        return __awaiter(this, void 0, void 0, function* () {
            // We only pass the fields that are provided in the request (content and rating)
            const updateData = {};
            if (data.content)
                updateData.content = data.content;
            if (data.rating)
                updateData.rating = data.rating;
            // Update the review using the provided fields
            const updatedReview = yield prisma.review.update({
                where: { id: data.id },
                data: updateData,
            });
            return updatedReview;
        });
    }
    deleteReview(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedReview = yield prisma.review.delete({
                where: { id: data.id },
            });
            return deletedReview;
        });
    }
}
exports.ReviewService = ReviewService;
