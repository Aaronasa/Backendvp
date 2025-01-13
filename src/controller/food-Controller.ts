import { Request, Response } from "express";
import {
  ICreateFood,
  IDeleteFood,
  IReadFood,
  IFood,
  IUpdateFood,
} from "../model/food-model";
import { FoodService } from "../services/food-Service";
import { FoodValidation } from "../validation/food-validation";

export class FoodController {
  static async createFood(req: Request, res: Response): Promise<void> {
    try {
      // Get the uploaded file path
      const imagePath = req.file?.path || "";

      // Validate the request body
      const requestData = {
        ...req.body,
        image: imagePath, // Use the uploaded image path
      };
      const request = FoodValidation.CREATE.parse(requestData);

      // Proceed with service logic
      const response: IFood = await new FoodService().createFood(request);
      res.status(201).json({
        message: "Food successfully created.",
        data: response,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({
        error:
          error instanceof Error
            ? error.message
            : "An error occurred while creating the food.",
      });
    }
  }

  static async readFoodById(req: Request, res: Response): Promise<void> {
    try {
      const params = FoodValidation.READ_BY_ID.parse({
        id: parseInt(req.params.id, 10),
      });

      const response: IFood = await new FoodService().readFoodById(params.id);
      res.status(200).json({
        message: "Food successfully retrieved.",
        data: response,
      });
    } catch (error) {
      console.error(error);
      res
        .status(400)
        .json({ error: "An error occurred while retrieving the food." });
    }
  }

  static async readAllFoods(req: Request, res: Response): Promise<void> {
    try {
      const response: IFood[] = await new FoodService().readAllFoods();
      res.status(200).json({
        message: "All foods successfully retrieved.",
        data: response,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving foods." });
    }
  }

  static async updateFood(req: Request, res: Response): Promise<void> {
    try {
      // Get the uploaded file path
      const imagePath = req.file?.path || "";

      // Validate the request body
      const requestData = {
        ...req.body,
        image: imagePath || req.body.image, // Use the new image or fallback to the existing one
      };
      const request = FoodValidation.UPDATE.parse(requestData);

      // Proceed with service logic
      const response: IFood = await new FoodService().updateFood(request);
      res.status(200).json({
        message: "Food successfully updated.",
        data: response,
      });
    } catch (error) {
      console.error(error);
      res
        .status(400)
        .json({ error: "An error occurred while updating the food." });
    }
  }

  static async deleteFood(req: Request, res: Response): Promise<void> {
    try {
      const request = FoodValidation.DELETE.parse(req.body);
      const response: IFood = await new FoodService().deleteFood(request);
      res.status(200).json({
        message: "Food successfully deleted.",
        data: response,
      });
    } catch (error) {
      console.error(error);
      res
        .status(400)
        .json({ error: "An error occurred while deleting the food." });
    }
  }
}
