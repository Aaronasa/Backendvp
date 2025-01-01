import { Request, Response } from 'express';
import { ICreateRestaurant, IDeleteRestaurant, IReadRestaurant, IRestaurant, IUpdateRestaurant } from '../model/restaurant-model';
import { RestaurantService } from '../services/restaurant-service';
import { RestaurantValidation } from "../validation/restaurant-validation";


export class RestaurantController {


  static async createRestaurant(req: Request, res: Response): Promise<void> {
    try {
      // Validate the request body
      const request = RestaurantValidation.CREATE.parse(req.body);
      
      // Proceed with service logic
      const response: IRestaurant = await new RestaurantService().createRestaurant(request);
      res.status(201).json({
        message: "Restaurant successfully created.",
        data: response,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error instanceof Error ? error.message : "An error occurred while creating the restaurant." });
    }
  }


  static async readRestaurantById(req: Request, res: Response): Promise<void> {
    try {
      // Validate the request params
      const params = RestaurantValidation.READ_BY_ID.parse({ id: parseInt(req.params.id, 10) });

      // Proceed with service logic
      const response: IRestaurant = await new RestaurantService().readRestaurantById(params.id);
      res.status(200).json({
        message: "Restaurant successfully retrieved.",
        data: response,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error:'An error occurred while retrieving the restaurant.'});
    }
  }

  static async readAllRestaurants(req: Request, res: Response): Promise<void> {
    try {
      const response: IRestaurant[] = await new RestaurantService().readAllRestaurants();
      res.status(200).json({
        message: 'All restaurants successfully retrieved.',
        data: response,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while retrieving restaurants.' });
    }
  }



  static async updateRestaurant(req: Request, res: Response): Promise<void> {
    try {
      // Validate the request body
      const request = RestaurantValidation.UPDATE.parse(req.body);

      // Proceed with service logic
      const response: IRestaurant = await new RestaurantService().updateRestaurant(request);
      res.status(200).json({
        message: "Restaurant successfully updated.",
        data: response,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'An error occurred while updating the restaurant.' });
    }
  }


  static async deleteRestaurant(req: Request, res: Response): Promise<void> {
    try {
      // Validate the request body
      const request = RestaurantValidation.DELETE.parse(req.body);

      // Proceed with service logic
      const response: IRestaurant = await new RestaurantService().deleteRestaurant(request);
      res.status(200).json({
        message: "Restaurant successfully deleted.",
        data: response,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'An error occurred while deleting the restaurant.' });
    }
  }
}
