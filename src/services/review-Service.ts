import { PrismaClient } from "@prisma/client";
import {
  ICreateReview,
  IDeleteReview,
  IReadReview,
  IReview,
  IUpdateReview,
} from "../model/review-model";

const prisma = new PrismaClient();

export class ReviewService {
  async createReview(data: ICreateReview): Promise<IReview> {
    try{
    console.log("Data being saved to the database:", data);
    const newReview = await prisma.review.create({data});
    console.log("Database response:", newReview);
    return newReview;
    } catch (error) {
      console.error("Error creating review in DB:", error);
      throw new Error("Database operation failed");
    }
  }

  async readReviewById(id: number): Promise<IReview> {
    try {
      console.log("Service: Fetching review with ID:", id); // Log the input ID
      const review = await prisma.review.findUnique({
        where: { id },
        // include: { user: true, restaurant: true },
      });
      if (!review) {
        console.warn("Service: No review found with ID:", id); // Log if no result is found
        throw new Error(`Review with ID ${id} not found`);
      }
      console.log("Service: Successfully fetched by id review:", review); // Log the result
      return review;
    } catch (error) {
      console.error("Service Error: Failed to fetch review by ID:", error); // Log the error
      throw new Error("Failed to fetch review by ID");
    }
  }

  async readReviewByRestaurantId(restaurantId: number): Promise<IReview[]> {
    try {
      console.log("Service Backend: Fetching reviews by restaurant ID:", restaurantId); // Log the input ID
      const reviews = await prisma.review.findMany({
        where: { restaurantId},
      });
      
      if (!reviews) {
        console.warn("Service: No reviews found with restaurant ID:", restaurantId); // Log if no result is found
        throw new Error(`Reviews with restaurant ID ${restaurantId} not found`);
      }
      console.log("Service: Successfully fetched reviews by restaurant ID:", reviews); // Log the result
      return reviews;
    } catch (error) {
      console.error("Service Error: Failed to fetch reviews by restaurant ID:", error); // Log the error
      throw new Error("Failed to fetch reviews by restaurant ID");
    }
  }

  async readAllReviews(): Promise<IReview[]> {
    try {
      console.log("Service: Starting to fetch all reviews from the database");
      const reviews = await prisma.review.findMany({
        //   {
        //     include: { user: true, restaurant: true },
        // }
      });
      console.log("Service: Successfully fetched all reviews:", reviews);
      return reviews;
    } catch (error) {
      console.error("Service Error: Failed to fetch all reviews:", error);
      throw new Error("Failed to fetch reviews");
    }
  }


  async updateReview(data: IUpdateReview): Promise<IReview> {
    // We only pass the fields that are provided in the request (content and rating)
    const updateData: { content?: string; rating?: number } = {};

    if (data.content) updateData.content = data.content;
    if (data.rating) updateData.rating = data.rating;

    // Update the review using the provided fields
    const updatedReview = await prisma.review.update({
      where: { id: data.id },
      data: updateData,
    });

    return updatedReview;
  }


  async deleteReview(data: IDeleteReview): Promise<IReview> {
    const deletedReview = await prisma.review.delete({
      where: { id: data.id }, // Make sure `id` is coming from `data`
    });
    return deletedReview;
  }
}
