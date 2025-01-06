import { Request, Response } from 'express';
import { ICreateRestaurant, IDeleteRestaurant, IReadRestaurant, IRestaurant, IRestaurantResponse, IUpdateRestaurant } from '../model/restaurant-model';
import { RestaurantService } from '../services/restaurant-Service';
import { RestaurantValidation } from "../validation/restaurant-validation";


export class RestaurantController {


  static async createRestaurant(req: Request, res: Response): Promise<void> {
    try {

      console.log("Uploaded file:", req.file);

      if (!req.file) throw new Error('Image is required');
      const imagePath = req.file.filename;
  
      const request = {
        ...RestaurantValidation.CREATE.parse(req.body),
        image: imagePath, // Add the uploaded image path
      };

      console.log("Parsed request data:", request);
  
      const response: IRestaurant = await new RestaurantService().createRestaurant(request);
     
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      response.image = `${baseUrl}/uploads/images/${response.image}`;
     
      res.status(201).json({
        message: 'Restaurant successfully created.',
        data: response,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error instanceof Error ? error.message : 'An error occurred while creating the restaurant.' });
    }
  }
  


  static async readRestaurantById(req: Request, res: Response): Promise<void> {
    try {
        const params = RestaurantValidation.READ_BY_ID.parse({ id: parseInt(req.params.id, 10) });

        const restaurant = await new RestaurantService().readRestaurantById(params.id);


        console.log("Backend Response:", {
          id: restaurant.id,
          name: restaurant.name,
          address: restaurant.address,
          phone: restaurant.phone,
          image: restaurant.image
      });
      
        // Ensure the full image URL is included
        const baseUrl = `${req.protocol}://${req.get("host")}`;
        restaurant.image = `${baseUrl}/uploads/images/${restaurant.image}`;

        res.status(200).json({
            message: "Restaurant by id successfully retrieved.",
            data: restaurant,
        });
    } catch (error) {
        console.error("Error retrieving restaurant:", error);
        res.status(400).json({ error: "An error occurred while retrieving the restaurant." });
    }
}

  static async readAllRestaurants(req: Request, res: Response): Promise<void> {
    try {
        const response = await new RestaurantService().readAllRestaurants();

        const baseUrl = `${req.protocol}://${req.get('host')}`; // Dynamically build base URL
        const restaurantsWithImageURL = response.data.map((restaurant) => ({
            ...restaurant,
            image:`${baseUrl}/uploads/images/${restaurant.image}`, // Ensure correct URL format
        }));

        res.status(200).json({
            message: 'All restaurants successfully retrieved.',
            data: restaurantsWithImageURL,
        });
    } catch (error) {
        console.error('Error fetching restaurants:', error);
        res.status(500).json({ error: 'An error occurred while retrieving restaurants.' });
    }
}



  static async updateRestaurant(req: Request, res: Response): Promise<void> {
    try {
      const imagePath = req.file ? req.file.filename : undefined; // Save only the filename in the database
  
      const request = {
        ...RestaurantValidation.UPDATE.parse(req.body),
        ...(imagePath ? { image: imagePath } : {}),
      };
  
      const response: IRestaurant = await new RestaurantService().updateRestaurant(request);
      res.status(200).json({
        message: 'Restaurant successfully updated.',
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
