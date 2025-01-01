import { PrismaClient } from "@prisma/client";
import { ICreateCategory, IDeleteCategory, IReadCategory, ICategory, IUpdateCategory } from "../model/category-model";

const prisma = new PrismaClient();

export class CategoryService {
  async createCategory(data: ICreateCategory): Promise<ICategory> {
    const newCategory = await prisma.category.create({
      data,
    });
    return newCategory;
  }

  async readCategoryById(id: number): Promise<ICategory> {
    const category = await prisma.category.findUnique({
      where: { id },
      include: { foods: true },
    });
    if (!category) throw new Error(`Category with ID ${id} not found`);
    return category;
  }

  async readAllCategories(): Promise<ICategory[]> {
    const categories = await prisma.category.findMany({
      include: { foods: true },
    });
    return categories;
  }

  async updateCategory(data: IUpdateCategory): Promise<ICategory> {
    const updatedCategory = await prisma.category.update({
      where: { id: data.id },
      data,
    });
    return updatedCategory;
  }

  async deleteCategory(data: IDeleteCategory): Promise<ICategory> {
    const deletedCategory = await prisma.category.delete({
      where: { id: data.id },
    });
    return deletedCategory;
  }
}
