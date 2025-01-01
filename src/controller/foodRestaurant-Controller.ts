import { Request, Response } from "express";
import { ICreateFoodRestaurant, IDeleteFoodRestaurant, IReadFoodRestaurant, IFoodRestaurant, IUpdateFoodRestaurant } from "../model/foodRestaurant-model";
import { FoodRestaurantService } from "../services/foodRestaurant-Service";
import { FoodRestaurantValidation } from "../validation/foodRestaurant-validation";

export class FoodRestaurantController {
  static async createFoodRestaurant(req: Request, res: Response): Promise<void> {
    try {
      // Validate the request body
      const request = FoodRestaurantValidation.CREATE.parse(req.body);
      
      // Proceed with service logic
      const response: IFoodRestaurant = await new FoodRestaurantService().createFoodRestaurant(request);
      res.status(201).json({
        message: "FoodRestaurant successfully created.",
        data: response,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error instanceof Error ? error.message : "An error occurred while creating the food restaurant." });
    }
  }

  static async readFoodRestaurantById(req: Request, res: Response): Promise<void> {
    try {
      const params = FoodRestaurantValidation.READ_BY_ID.parse({ id: parseInt(req.params.id, 10) });

      const response: IFoodRestaurant = await new FoodRestaurantService().readFoodRestaurantById(params.id);
      res.status(200).json({
        message: "FoodRestaurant successfully retrieved.",
        data: response,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'An error occurred while retrieving the food restaurant.' });
    }
  }

  static async readAllFoodRestaurants(req: Request, res: Response): Promise<void> {
    try {
      const response: IFoodRestaurant[] = await new FoodRestaurantService().readAllFoodRestaurants();
      res.status(200).json({
        message: 'All food restaurants successfully retrieved.',
        data: response,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while retrieving food restaurants.' });
    }
  }

  static async updateFoodRestaurant(req: Request, res: Response): Promise<void> {
    try {
      const request = FoodRestaurantValidation.UPDATE.parse(req.body);
      const response: IFoodRestaurant = await new FoodRestaurantService().updateFoodRestaurant(request);
      res.status(200).json({
        message: "FoodRestaurant successfully updated.",
        data: response,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'An error occurred while updating the food restaurant.' });
    }
  }

  static async deleteFoodRestaurant(req: Request, res: Response): Promise<void> {
    try {
      const request = FoodRestaurantValidation.DELETE.parse(req.body);
      const response: IFoodRestaurant = await new FoodRestaurantService().deleteFoodRestaurant(request);
      res.status(200).json({
        message: "FoodRestaurant successfully deleted.",
        data: response,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'An error occurred while deleting the food restaurant.' });
    }
  }
}
