import { PrismaClient } from "@prisma/client";
import { ICreateFood, IDeleteFood, IReadFood, IFood, IUpdateFood } from "../model/food-model";

const prisma = new PrismaClient();

export class FoodService {
  async createFood(data: ICreateFood): Promise<IFood> {
    const newFood = await prisma.food.create({
      data,
    });
    return newFood;
  }

  async readFoodById(id: number): Promise<IFood> {
    const food = await prisma.food.findUnique({
      where: { id },
      include: { category: true, city: true, foodRestaurants: true },
    });
    if (!food) throw new Error(`Food with ID ${id} not found`);
    return food;
  }

  async readAllFoods(): Promise<IFood[]> {
    const foods = await prisma.food.findMany({
      include: { category: true, city: true, foodRestaurants: true },
    });
    return foods;
  }

  async updateFood(data: IUpdateFood): Promise<IFood> {
    const updatedFood = await prisma.food.update({
      where: { id: data.id },
      data,
    });
    return updatedFood;
  }

  async deleteFood(data: IDeleteFood): Promise<IFood> {
    const deletedFood = await prisma.food.delete({
      where: { id: data.id },
    });
    return deletedFood;
  }
}
