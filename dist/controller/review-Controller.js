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
exports.ReviewController = void 0;
const review_Service_1 = require("../services/review-Service");
const review_validation_1 = require("../validation/review-validation");
class ReviewController {
    static createReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = review_validation_1.ReviewValidation.CREATE.parse(req.body); // Validate and parse the request body
                const response = yield new review_Service_1.ReviewService().createReview(request);
                res.status(201).json({
                    message: "Review successfully created.",
                    data: response,
                });
            }
            catch (error) {
                console.error(error);
                res.status(400).json({
                    error: error instanceof Error
                        ? error.message
                        : "An error occurred while creating the review.",
                });
            }
        });
    }
    static readReviewsByRestaurant(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const restaurantId = review_validation_1.ReviewValidation.READ.parse({
                    restaurantId: parseInt(req.params.restaurantId, 10),
                });
                if (isNaN(restaurantId)) {
                    throw new Error("Invalid restaurant ID");
                } // Validate restaurantId
                const response = yield new review_Service_1.ReviewService().readReviewByRestaurantId(restaurantId);
                if (Array.isArray(response)) {
                    res.status(200).json({
                        message: "Reviews successfully retrieved for restaurant.",
                        data: response,
                    });
                }
                else {
                    res.status(200).json({
                        message: "Review successfully retrieved for restaurant.",
                        data: [response],
                    });
                }
            }
            catch (error) {
                console.error(error);
                res.status(400).json({
                    error: error instanceof Error
                        ? error.message
                        : "An error occurred while retrieving the reviews for this restaurant.",
                });
            }
        });
    }
    // Function to read all reviews from all restaurants
    static readAllReviews(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield new review_Service_1.ReviewService().readAllReviews();
                // Check if the response is an array or a single review
                if (Array.isArray(response)) {
                    res.status(200).json({
                        message: "All reviews successfully retrieved.",
                        data: response,
                    });
                }
                else {
                    res.status(200).json({
                        message: "Review successfully retrieved.",
                        data: [response], // Wrap the single review in an array
                    });
                }
            }
            catch (error) {
                console.error(error);
                res
                    .status(500)
                    .json({ error: "An error occurred while retrieving all reviews." });
            }
        });
    }
    static updateReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updateData = review_validation_1.ReviewValidation.UPDATE.parse(Object.assign({ id: parseInt(id, 10) }, req.body)); // Validate and parse the input
                const response = yield new review_Service_1.ReviewService().updateReview(updateData);
                res.status(200).json({
                    message: "Review successfully updated.",
                    data: response,
                });
            }
            catch (error) {
                console.error(error);
                res.status(400).json({
                    error: error instanceof Error
                        ? error.message
                        : "An error occurred while updating the review.",
                });
            }
        });
    }
    static deleteReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.body; // Get review ID from request body, not params
                const request = { id: parseInt(id, 10) }; // Create the delete request
                // Call the service to delete the review
                const response = yield new review_Service_1.ReviewService().deleteReview(request);
                // Send success response
                res.status(200).json({
                    message: "Review successfully deleted.",
                    data: response, // Send back the deleted review data
                });
            }
            catch (error) {
                console.error(error);
                res.status(400).json({
                    error: error instanceof Error
                        ? error.message
                        : "An error occurred while deleting the review.",
                });
            }
        });
    }
}
exports.ReviewController = ReviewController;
