import { Request, Response } from 'express';
import { ICreateRestaurant, IDeleteRestaurant, IReadRestaurant, IRestaurant, IUpdateRestaurant } from '../model/restaurant-model';
import { RestaurantService } from '../services/restaurant-service';


export class RestaurantController {
  static async createRestaurant(req: Request, res: Response): Promise<void> {
    try {
      const request: ICreateRestaurant = req.body as ICreateRestaurant;
      const response: IRestaurant = await new RestaurantService().createRestaurant(request);
      res.status(201).json({
        message: 'Restaurant successfully created.',
        data: response,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while creating the restaurant.' });
    }
  }

  static async readRestaurantById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const response: IRestaurant = await new RestaurantService().readRestaurantById(id);
      res.status(200).json({
        message: 'Restaurant successfully retrieved.',
        data: response,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while retrieving the restaurant.' });
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
      const request: IUpdateRestaurant = req.body as IUpdateRestaurant;
      const response: IRestaurant = await new RestaurantService().updateRestaurant(request);
      res.status(200).json({
        message: 'Restaurant successfully updated.',
        data: response,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while updating the restaurant.' });
    }
  }

  static async deleteRestaurant(req: Request, res: Response): Promise<void> {
    try {
      const request: IDeleteRestaurant = req.body as IDeleteRestaurant;
      const response: IRestaurant = await new RestaurantService().deleteRestaurant(request);
      res.status(200).json({
        message: 'Restaurant successfully deleted.',
        data: response,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while deleting the restaurant.' });
    }
  }
}
