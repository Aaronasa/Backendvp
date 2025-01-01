import { Request, Response } from "express";
import { ICreateReview, IDeleteReview, IReadReview, IReview, IUpdateReview } from "../model/review-model";
import { ReviewService } from "../services/review-Service";

export class ReviewController {
  static async createReview(req: Request, res: Response): Promise<void> {
    try {
      const request: ICreateReview = req.body as ICreateReview;
      const response: IReview = await new ReviewService().createReview(request);
      res.status(201).json({
        message: "Review successfully created.",
        data: response,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while creating the review." });
    }
  }

  static async readReviewsByRestaurant(req: Request, res: Response): Promise<void> {
    try {
      const restaurantId = parseInt(req.params.restaurantId, 10);
      const response: IReview | IReview[] = await new ReviewService().readReview({ restaurantId });

      // Check if the response is an array or a single review
      if (Array.isArray(response)) {
        res.status(200).json({
          message: 'Reviews successfully retrieved for restaurant.',
          data: response,
        });
      } else {
        res.status(200).json({
          message: 'Review successfully retrieved for restaurant.',
          data: [response], // Wrap the single review in an array
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while retrieving the reviews for this restaurant.' });
    }
  }

  // Function to read all reviews from all restaurants
  static async readAllReviews(req: Request, res: Response): Promise<void> {
    try {
      const response: IReview | IReview[] = await new ReviewService().readReview({});
      
      // Check if the response is an array or a single review
      if (Array.isArray(response)) {
        res.status(200).json({
          message: 'All reviews successfully retrieved.',
          data: response,
        });
      } else {
        res.status(200).json({
          message: 'Review successfully retrieved.',
          data: [response], // Wrap the single review in an array
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while retrieving all reviews.' });
    }
  }
  

  static async updateReview(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params; // Extract ID from route params
    const { content, rating }: { content?: string; rating?: number } = req.body;

    if (!id) {
      res.status(400).json({ error: "Review ID is required to update the review." });
      return;
    }

    const updateData: IUpdateReview = { id: Number(id), content, rating };

    // Call the service to update the review
    const updatedReview: IReview = await new ReviewService().updateReview(updateData);

    // Send a successful response
    res.status(200).json({
      message: "Review successfully updated.",
      data: updatedReview,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while updating the review." });
  }
}


  

  static async deleteReview(req: Request, res: Response): Promise<void> {
    try {
      const request: IDeleteReview = req.body as IDeleteReview;
      const response: IReview = await new ReviewService().deleteReview(request);
      res.status(200).json({
        message: "Review successfully deleted.",
        data: response,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while deleting the review." });
    }
  }
}