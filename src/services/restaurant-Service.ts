import { PrismaClient } from '@prisma/client';
import { ICreateRestaurant, IDeleteRestaurant, IReadRestaurant, IRestaurant, IRestaurantResponse, IUpdateRestaurant  } from '../model/restaurant-model';

const prisma = new PrismaClient();

export class RestaurantService {
  async createRestaurant(data: ICreateRestaurant): Promise<IRestaurant> {
    try {
      console.log("Data being saved to the database:", data);
      const newRestaurant = await prisma.restaurant.create({ data });
      console.log("Database response:", newRestaurant);
      return newRestaurant;
  } catch (error) {
      console.error("Error creating restaurant in DB:", error);
      throw new Error("Database operation failed");
  }
  }

  async readRestaurantById(id: number): Promise<IRestaurant> {
    try {
      console.log("Service: Fetching restaurant with ID:", id); // Log the input ID
      const restaurant = await prisma.restaurant.findUnique({
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
    } catch (error) {
      console.error("Service Error: Failed to fetch restaurant by ID:", error); // Log the error
      throw new Error("Failed to fetch restaurant by ID");
    }
  }

  async readAllRestaurants(): Promise<IRestaurantResponse> {
    try {
        console.log("Service: Starting to fetch all restaurants from the database");
        const restaurants = await prisma.restaurant.findMany(
        //   {
        //     include: { reviews: true, foodRestaurants: true },
        // }
      );
        console.log("Service: Successfully fetched all restaurants:", restaurants);
        return { data: restaurants };
    } catch (error) {
        console.error("Service Error: Failed to fetch all restaurants:", error);
        throw new Error("Failed to fetch restaurants");
    }
}

  async updateRestaurant(data: IUpdateRestaurant): Promise<IRestaurant> {
    const updatedRestaurant = await prisma.restaurant.update({
      where: { id: data.id },
      data,
    });
    return updatedRestaurant;
  }

  async deleteRestaurant(data: IDeleteRestaurant): Promise<IRestaurant> {
    try {
      console.log("Deleting restaurant with ID:", data.id);
      const deletedRestaurant = await prisma.restaurant.delete({
        where: { id: data.id },
      });
      console.log("Deleted restaurant:", deletedRestaurant);
      return deletedRestaurant;
    } catch (error) {
      console.error("Error deleting restaurant:", error);
      throw new Error("Failed to delete restaurant");
    }
  }
}