import { Request, Response } from "express";
import { ICreateCategory, IDeleteCategory, IReadCategory, ICategory, IUpdateCategory } from "../model/category-model";
import { CategoryService } from "../services/category-Service";
import { CategoryValidation } from "../validation/category-validation";

export class CategoryController {
  static async createCategory(req: Request, res: Response): Promise<void> {
    try {
      // Validate the request body
      const request = CategoryValidation.CREATE.parse(req.body);
      
      // Proceed with service logic
      const response: ICategory = await new CategoryService().createCategory(request);
      res.status(201).json({
        message: "Category successfully created.",
        data: response,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error instanceof Error ? error.message : "An error occurred while creating the category." });
    }
  }

  static async readCategoryById(req: Request, res: Response): Promise<void> {
    try {
      const params = CategoryValidation.READ_BY_ID.parse({ id: parseInt(req.params.id, 10) });

      const response: ICategory = await new CategoryService().readCategoryById(params.id);
      res.status(200).json({
        message: "Category successfully retrieved.",
        data: response,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'An error occurred while retrieving the category.' });
    }
  }

  static async readAllCategories(req: Request, res: Response): Promise<void> {
    try {
      const response: ICategory[] = await new CategoryService().readAllCategories();
      res.status(200).json({
        message: 'All categories successfully retrieved.',
        data: response,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while retrieving categories.' });
    }
  }

  static async updateCategory(req: Request, res: Response): Promise<void> {
    try {
      const request = CategoryValidation.UPDATE.parse(req.body);
      const response: ICategory = await new CategoryService().updateCategory(request);
      res.status(200).json({
        message: "Category successfully updated.",
        data: response,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'An error occurred while updating the category.' });
    }
  }

  static async deleteCategory(req: Request, res: Response): Promise<void> {
    try {
      const request = CategoryValidation.DELETE.parse(req.body);
      const response: ICategory = await new CategoryService().deleteCategory(request);
      res.status(200).json({
        message: "Category successfully deleted.",
        data: response,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'An error occurred while deleting the category.' });
    }
  }
}
