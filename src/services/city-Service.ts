import { Prisma, PrismaClient } from "@prisma/client";
import { ICity, ICreateCity, IDeleteCity, IReadCity, IUpdateCity, ICityResponse } from "../model/city-model";

const prisma = new PrismaClient();

export class CityService {
  async createCity(data: ICreateCity): Promise<ICity> {
    const newCity = await prisma.city.create({
      data,
    });
    return newCity;
  }

  async getCityById(id: string): Promise<ICity | null> {
    try {
      const cityId = parseInt(id, 10); // Konversi id dari string ke number
      if (isNaN(cityId)) {
        throw new Error('Invalid ID format. ID must be a number.');
      }
  
      const city = await prisma.city.findUnique({
        where: { id: cityId },
      });
  
      if (!city) {
        console.log(`City with ID ${id} not found.`);
        return null;
      }
  
      return city;
    } catch (error) {
      console.error(`Error fetching city with ID ${id}:`, error);
      throw new Error('Unable to fetch city.');
    }
  }



  async getAllCities(): Promise<ICityResponse> {
    try {
        const cities = await prisma.city.findMany(
            // include: { foods: true }, // Include related foods
        );
        console.log("All Cities: " , cities)
        return { data: cities };
    } catch (error) {
        console.error('Error fetching cities:', error);
        throw new Error('Unable to fetch cities.');
    }
}

async updateCity(id: number, data: Partial<ICity>): Promise<ICity | null> {
  try {
    const updatedCity = await prisma.city.update({
      where: { id },
      data,
    });

    console.log(`City with ID ${id} updated successfully.`);
    return updatedCity;
  } catch (error: unknown) {
    console.error(`Error updating city with ID ${id}:`, error);

    // Handle specific error jika city tidak ditemukan
    if (error instanceof Error && (error as any).code === "P2025") {
      console.error(`City with ID ${id} does not exist.`);
      return null;
    }

    throw new Error("Unable to update city.");
  }
}

async deleteCity(id: number): Promise<ICity | null> {
  try {
    const deletedCity = await prisma.city.delete({
      where: { id },
    });

    console.log(`City with ID ${id} deleted successfully.`);
    return deletedCity;
  } catch (error: unknown) {
    console.error(`Error deleting city with ID ${id}:`, error);

    // Handle specific error if city not found
    if (error instanceof Error && (error as any).code === "P2025") {
      console.error(`City with ID ${id} does not exist.`);
      return null;
    }

    throw new Error("Unable to delete city.");
  }
}


}
