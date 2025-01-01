import { Request, Response } from "express";
import { ICreateCity, IDeleteCity, IReadCity, ICity, IUpdateCity } from "../model/city-model";
import { CityService } from "../services/city-Service";
import { CityValidation } from "../validation/city-validation";

export class CityController {
  static async createCity(req: Request, res: Response): Promise<void> {
    try {
      const request = CityValidation.CREATE.parse(req.body);
      const response: ICity = await new CityService().createCity(request);
      res.status(201).json({
        message: "City successfully created.",
        data: response,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error instanceof Error ? error.message : "An error occurred while creating the city." });
    }
  }

  static async readCityById(req: Request, res: Response): Promise<void> {
    try {
      const params = CityValidation.READ_BY_ID.parse({ id: parseInt(req.params.id, 10) });
      const response: ICity = await new CityService().readCityById(params.id);
      res.status(200).json({
        message: "City successfully retrieved.",
        data: response,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: "An error occurred while retrieving the city." });
    }
  }

  static async readAllCities(req: Request, res: Response): Promise<void> {
    try {
      const response: ICity[] = await new CityService().readAllCities();
      res.status(200).json({
        message: "All cities successfully retrieved.",
        data: response,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while retrieving cities." });
    }
  }

  static async updateCity(req: Request, res: Response): Promise<void> {
    try {
      const request = CityValidation.UPDATE.parse(req.body);
      const response: ICity = await new CityService().updateCity(request);
      res.status(200).json({
        message: "City successfully updated.",
        data: response,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: "An error occurred while updating the city." });
    }
  }

  static async deleteCity(req: Request, res: Response): Promise<void> {
    try {
      const request = CityValidation.DELETE.parse(req.body);
      const response: ICity = await new CityService().deleteCity(request);
      res.status(200).json({
        message: "City successfully deleted.",
        data: response,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: "An error occurred while deleting the city." });
    }
  }
}
