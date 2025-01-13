import { Request, Response } from "express";
import {
  ICreateReview,
  IDeleteReview,
  IReadReview,
  IReview,
  IUpdateReview,
} from "../model/review-model";
import { ReviewService } from "../services/review-Service";
import { ReviewValidation } from "../validation/review-validation";

export class ReviewController {
  static async createReview(req: Request, res: Response): Promise<void> {
    try {
      const request = ReviewValidation.CREATE.parse(req.body); // Validate and parse the request body
      const response: IReview = await new ReviewService().createReview(request);
      res.status(201).json({
        message: "Review successfully created.",
        data: response,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({
        error:
          error instanceof Error
            ? error.message
            : "An error occurred while creating the review.",
      });
    }
  }

  static async readReviewsById(req: Request,res: Response): Promise<void> {
    try{
      const params = ReviewValidation.READ_BY_ID.parse({
        id: parseInt(req.params.id, 10),
      });

      const review = await new ReviewService().readReviewById(params.id);
      console.log("Backend Response:", {
        id: review.id,
        content: review.content,
        rating: review.rating,
        userId: review.userId,
        restaurantId: review.restaurantId,
      });
      res.status(200).json({
        message: "Review successfully retrieved.",
        data: review,
      });
    } catch (error) {
      console.error("Error retrieving review:", error);
      res
        .status(400)
        .json({ error: "An error occurred while retrieving the review." });
    }
  }

  static async readReviewsByRestaurant(req: Request,res: Response): Promise<void> {
    try {
      const restaurantId = ReviewValidation.READ.parse({
        restaurantId: parseInt(req.params.restaurantId, 10),
      });
      if (isNaN(restaurantId)) {
        throw new Error("Invalid restaurant ID : " + restaurantId);
      } // Validate restaurantId
      const response = await new ReviewService().readReviewByRestaurantId(restaurantId);
      if (Array.isArray(response)) {
        res.status(200).json({
          message: "Reviews successfully retrieved for restaurant.",
          data: response,
        });
      } else {
        res.status(200).json({
          message: "Review successfully retrieved for restaurant.",
          data: [response],
        });
      }
    } catch (error) {
      console.error(error);
      res.status(400).json({
        error:
          error instanceof Error
            ? error.message
            : "An error occurred while retrieving the reviews for this restaurant.",
      });
    }
  }

  // Function to read all reviews from all restaurants
  static async readAllReviews(req: Request, res: Response): Promise<void> {
    try {
      const response: IReview | IReview[] =
        await new ReviewService().readAllReviews();

      // Check if the response is an array or a single review
      if (Array.isArray(response)) {
        res.status(200).json({
          message: "All reviews successfully retrieved.",
          data: response,
        });
      } else {
        res.status(200).json({
          message: "Review successfully retrieved.",
          data: response, // Wrap the single review in an array
        });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving all reviews." });
    }
  }

  static async updateReview(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData = ReviewValidation.UPDATE.parse({
        id: parseInt(id, 10),
        ...req.body,
      }); // Validate and parse the input
      const response = await new ReviewService().updateReview(updateData);

      res.status(200).json({
        message: "Review successfully updated.",
        data: response,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({
        error:
          error instanceof Error
            ? error.message
            : "An error occurred while updating the review.",
      });
    }
  }

  static async deleteReview(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params; // Get review ID from request body, not params
      if(!id) throw new Error("Invalid review ID");
      const request: IDeleteReview = { id: parseInt(id, 10) }; // Create the delete request

      // Call the service to delete the review
      const response = await new ReviewService().deleteReview(request);

      // Send success response
      res.status(200).json({
        message: "Review successfully deleted.",
        data: response, // Send back the deleted review data
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({
        error:
          error instanceof Error
            ? error.message
            : "An error occurred while deleting the review.",
      });
    }
  }

  
}
