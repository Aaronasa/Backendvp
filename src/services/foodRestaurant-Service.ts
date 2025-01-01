import { PrismaClient } from "@prisma/client";
import { ICreateFoodRestaurant, IDeleteFoodRestaurant, IReadFoodRestaurant, IFoodRestaurant, IUpdateFoodRestaurant } from "../model/foodRestaurant-model";

const prisma = new PrismaClient();

export class FoodRestaurantService {
  async createFoodRestaurant(data: ICreateFoodRestaurant): Promise<IFoodRestaurant> {
    const newFoodRestaurant = await prisma.foodRestaurant.create({
      data,
    });
    return newFoodRestaurant;
  }

  async readFoodRestaurantById(id: number): Promise<IFoodRestaurant> {
    const foodRestaurant = await prisma.foodRestaurant.findUnique({
      where: { id },
      include: { food: true, restaurant: true },
    });
    if (!foodRestaurant) throw new Error(`FoodRestaurant with ID ${id} not found`);
    return foodRestaurant;
  }

  async readAllFoodRestaurants(): Promise<IFoodRestaurant[]> {
    const foodRestaurants = await prisma.foodRestaurant.findMany({
      include: { food: true, restaurant: true },
    });
    return foodRestaurants;
  }

  async updateFoodRestaurant(data: IUpdateFoodRestaurant): Promise<IFoodRestaurant> {
    const updatedFoodRestaurant = await prisma.foodRestaurant.update({
      where: { id: data.id },
      data,
    });
    return updatedFoodRestaurant;
  }

  async deleteFoodRestaurant(data: IDeleteFoodRestaurant): Promise<IFoodRestaurant> {
    const deletedFoodRestaurant = await prisma.foodRestaurant.delete({
      where: { id: data.id },
    });
    return deletedFoodRestaurant;
  }
}
