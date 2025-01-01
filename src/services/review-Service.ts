import { PrismaClient } from "@prisma/client";
import { ICreateReview, IDeleteReview, IReadReview, IReview, IUpdateReview } from "../model/review-model";

const prisma = new PrismaClient();

export class ReviewService {
  async createReview(data: ICreateReview): Promise<IReview> {
    const newReview = await prisma.review.create({
      data,
    });
    return newReview;
  }

  async readReview(query: IReadReview): Promise<IReview | IReview[]> {
    if (query.id) {
      // Fetch review by ID
      const review = await prisma.review.findUnique({
        where: { id: query.id },
        include: { user: true, restaurant: true },
      });
      if (!review) throw new Error(`Review with ID ${query.id} not found`);
      return review;
    } else if (query.restaurantId) {
      // Fetch reviews by restaurant ID
      const reviews = await prisma.review.findMany({
        where: { restaurantId: query.restaurantId },
        include: { user: true, restaurant: true },
      });
      return reviews;
    } else {
      // Fetch all reviews
      const reviews = await prisma.review.findMany({
        include: { user: true, restaurant: true },
      });
      return reviews;
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
      where: { id: data.id },
    });
    return deletedReview;
  }
}