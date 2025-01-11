import { Request, Response } from "express";
import {
  ICreateCity,
  IDeleteCity,
  IReadCity,
  ICity,
  IUpdateCity,
} from "../model/city-model";
import { CityService } from "../services/city-Service";
import { CityValidation } from "../validation/city-validation";

export class CityController {
  static async createCity(req: Request, res: Response): Promise<void> {
    try {
      if (!req.file) throw new Error("Image is required");
      const imagePath = req.file.filename;

      const request = {
        ...CityValidation.CREATE.parse(req.body),
        image: imagePath,
      };

      const response: ICity = await new CityService().createCity(request);
      res.status(201).json({
        message: "City successfully created.",
        data: response,
      });
    } catch (error) {
      console.error(error);
      res
        .status(400)
        .json({
          error:
            error instanceof Error
              ? error.message
              : "An error occurred while creating the restaurant.",
        });
    }
  }

  static async readAllCities(req: Request, res: Response): Promise<void> {
    try {
      const response = await new CityService().getAllCities();

      const baseUrl = `${req.protocol}://${req.get("host")}`; // Dynamically build base URL
      const restaurantsWithImageURL = response.data.map((city) => ({
        ...city,
        image: `${baseUrl}/images/${city.image}`, // Ensure correct URL format
      }));

      res.status(200).json({
        message: "All restaurants successfully retrieved.",
        data: restaurantsWithImageURL,
      });
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving restaurants." });
    }
  }

  static async readCityById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const city = await new CityService().getCityById(id);
      if (!city) {
        res.status(404).json({
          message: "City not found.",
        });
        return;
      }

      const baseUrl = `${req.protocol}://${req.get("host")}`; // Dynamically build base URL
      const cityWithImageURL = {
        ...city,
        image: `${baseUrl}/images/${city.image}`,
      };

      res.status(200).json({
        message: "City successfully retrieved.",
        data: cityWithImageURL,
      });
    } catch (error) {
      console.error("Error fetching city by ID:", error);
      res.status(500).json({
        error: "An error occurred while retrieving the city.",
      });
    }
  }

  static async updateCity(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10); // Konversi ID dari string ke number
      if (isNaN(id)) {
        throw new Error("Invalid ID format. ID must be a number.");
      }

      const imagePath = req.file ? req.file.filename : undefined;

      const updateData = {
        ...CityValidation.UPDATE.parse(req.body), // Validasi body
        ...(imagePath && { image: imagePath }), // Tambahkan gambar jika ada
      };

      const updatedCity = await new CityService().updateCity(id, updateData);

      if (!updatedCity) {
        res.status(404).json({ message: "City not found." });
        return;
      }

      res.status(200).json({
        message: "City successfully updated.",
        data: updatedCity,
      });
    } catch (error) {
      console.error("Error updating city:", error);
      res.status(400).json({
        error: error instanceof Error ? error.message : "An error occurred.",
      });
    }
  }

  static async deleteCity(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10); // Convert ID from string to number
      if (isNaN(id)) {
        throw new Error("Invalid ID format. ID must be a number.");
      }

      const deletedCity = await new CityService().deleteCity(id);

      if (!deletedCity) {
        res.status(404).json({ message: "City not found." });
        return;
      }

      res.status(200).json({
        message: "City successfully deleted.",
      });
    } catch (error) {
      console.error("Error deleting city:", error);
      res.status(400).json({
        error: error instanceof Error ? error.message : "An error occurred.",
      });
    }
  }
}
