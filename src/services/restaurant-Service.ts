import { PrismaClient } from '@prisma/client';
import { ICreateRestaurant, IDeleteRestaurant, IReadRestaurant, IRestaurant, IUpdateRestaurant  } from '../model/restaurant-model';

const prisma = new PrismaClient();

export class RestaurantService {
  async createRestaurant(data: ICreateRestaurant): Promise<IRestaurant> {
    const newRestaurant = await prisma.restaurant.create({
      data,
    });
    return newRestaurant;
  }

  async readRestaurantById(id: number): Promise<IRestaurant> {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id },
      include: { reviews: true, foodRestaurants: true },
    });
    if (!restaurant) throw new Error(`Restaurant with ID ${id} not found`);
    return restaurant;
  }

  async readAllRestaurants(): Promise<IRestaurant[]> {
    const restaurants = await prisma.restaurant.findMany({
      include: { reviews: true, foodRestaurants: true },
    });
    return restaurants;
  }

  async updateRestaurant(data: IUpdateRestaurant): Promise<IRestaurant> {
    const updatedRestaurant = await prisma.restaurant.update({
      where: { id: data.id },
      data,
    });
    return updatedRestaurant;
  }

  async deleteRestaurant(data: IDeleteRestaurant): Promise<IRestaurant> {
    const deletedRestaurant = await prisma.restaurant.delete({
      where: { id: data.id },
    });
    return deletedRestaurant;
  }
}