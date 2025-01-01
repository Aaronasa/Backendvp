import { PrismaClient } from "@prisma/client";
import { ICity, ICreateCity, IDeleteCity, IReadCity, IUpdateCity } from "../model/city-model";

const prisma = new PrismaClient();

export class CityService {
  async createCity(data: ICreateCity): Promise<ICity> {
    const newCity = await prisma.city.create({
      data,
    });
    return newCity;
  }

  async readCityById(id: number): Promise<ICity> {
    const city = await prisma.city.findUnique({
      where: { id },
      include: { foods: true }, // Adjust if foods relations are needed
    });
    if (!city) throw new Error(`City with ID ${id} not found`);
    return city;
  }

  async readAllCities(): Promise<ICity[]> {
    const cities = await prisma.city.findMany({
      include: { foods: true }, // Adjust if foods relations are needed
    });
    return cities;
  }

  async updateCity(data: IUpdateCity): Promise<ICity> {
    const updatedCity = await prisma.city.update({
      where: { id: data.id },
      data,
    });
    return updatedCity;
  }

  async deleteCity(data: IDeleteCity): Promise<ICity> {
    const deletedCity = await prisma.city.delete({
      where: { id: data.id },
    });
    return deletedCity;
  }
}
