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
            try {
                console.log("Data being saved to the database:", data);
                const newReview = yield prisma.review.create({ data });
                console.log("Database response:", newReview);
                return newReview;
            }
            catch (error) {
                console.error("Error creating review in DB:", error);
                throw new Error("Database operation failed");
            }
        });
    }
    readReviewById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Service: Fetching review with ID:", id); // Log the input ID
                const review = yield prisma.review.findUnique({
                    where: { id },
                    // include: { user: true, restaurant: true },
                });
                if (!review) {
                    console.warn("Service: No review found with ID:", id); // Log if no result is found
                    throw new Error(`Review with ID ${id} not found`);
                }
                console.log("Service: Successfully fetched by id review:", review); // Log the result
                return review;
            }
            catch (error) {
                console.error("Service Error: Failed to fetch review by ID:", error); // Log the error
                throw new Error("Failed to fetch review by ID");
            }
        });
    }
    readReviewByRestaurantId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Service Backend: Fetching reviews by restaurant ID:", id); // Log the input ID
                const reviews = yield prisma.review.findMany({
                    where: { restaurantId: id },
                });
                if (!reviews) {
                    console.warn("Service: No reviews found with restaurant ID:", id); // Log if no result is found
                    throw new Error(`Reviews with restaurant ID ${id} not found`);
                }
                console.log("Service: Successfully fetched reviews by restaurant ID:", reviews); // Log the result
                return reviews;
            }
            catch (error) {
                console.error("Service Error: Failed to fetch reviews by restaurant ID:", error); // Log the error
                throw new Error("Failed to fetch reviews by restaurant ID");
            }
        });
    }
    readAllReviews() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Service: Starting to fetch all reviews from the database");
                const reviews = yield prisma.review.findMany({
                //   {
                //     include: { user: true, restaurant: true },
                // }
                });
                console.log("Service: Successfully fetched all reviews:", reviews);
                return reviews;
            }
            catch (error) {
                console.error("Service Error: Failed to fetch all reviews:", error);
                throw new Error("Failed to fetch reviews");
            }
        });
    }
    // async readReview(query: IReadReview): Promise<IReview | IReview[]> {
    //   if (query.id) {
    //     // Fetch review by ID
    //     const review = await prisma.review.findUnique({
    //       where: { id: query.id },
    //       include: { user: true, restaurant: true },
    //     });
    //     if (!review) throw new Error(`Review with ID ${query.id} not found`);
    //     return review;
    //   } else if (query.restaurantId) {
    //     // Fetch reviews by restaurant ID
    //     const reviews = await prisma.review.findMany({
    //       where: { restaurantId: query.restaurantId },
    //       include: { user: true, restaurant: true },
    //     });
    //     return reviews;
    //   } else {
    //     // Fetch all reviews
    //     const reviews = await prisma.review.findMany({
    //       include: { user: true, restaurant: true },
    //     });
    //     return reviews;
    //   }
    // }
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
                where: { id: data.id }, // Make sure `id` is coming from `data`
            });
            return deletedReview;
        });
    }
}
exports.ReviewService = ReviewService;
