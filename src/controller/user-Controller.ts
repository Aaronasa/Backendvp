// userController.ts
import { Request, Response } from "express";
import {
  IUser,
  ICreateUser,
  IUpdateUser,
  IDeleteUser,
  ILoginUser,
  ILogoutUser,
} from "../model/user-Model";
import { UserService } from "../services/user-Service";
import { UserRequest } from "../types/user-request";

export class UserController {
  // Create User
  static async createUser(req: Request, res: Response): Promise<void> {
    try {
      const request: ICreateUser = req.body as ICreateUser;
      const response: IUser = await new UserService().createUser(request);
      res.status(201).json({
        message: "User successfully created.",
        data: response,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while creating the user." });
    }
  }

  // Read all users
  static async readAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const response: IUser[] = await new UserService().readAllUsers();
      res.status(200).json({
        message: "Users successfully retrieved.",
        data: response,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving users." });
    }
  }

  // userController.ts

  static async readUserByToken(req: UserRequest, res: Response): Promise<void> {
    try {
      const email = req.body.email; // Extract email from the body or use query params
      const token = req.get("x-API-Token"); // Extract the token from headers (e.g., x-API-Token)

      if (!email || !token) {
        res.status(400).json({ error: "Email and token are required." });
        return;
      }

      // Pass both email and token to the service method
      const response: IUser | null = await new UserService().readUserByToken(
        email,
        token
      );

      if (response) {
        res.status(200).json({
          message: "User successfully retrieved.",
          data: response,
        });
      } else {
        res
          .status(404)
          .json({ error: "User not found or token does not match." });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving the user." });
    }
  }

  // Login User
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password }: ILoginUser = req.body as ILoginUser;
      const response = await new UserService().login(email, password);
      res.status(200).json({
        message: "Login successful.",
        data: response, // User data returned along with token
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
        res
          .status(401)
          .json({ error: error.message || "Invalid email or password." });
      } else {
        console.error("Unexpected error:", error);
        res.status(500).json({ error: "An unexpected error occurred." });
      }
    }
  }

  // Logout User
  static async logout(req: UserRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id; // Ensure the user is logged in

      if (userId === undefined) {
        // If userId is undefined, return an appropriate error response
        res.status(400).json({ error: "User is not authenticated." });
        return;
      }

      const response = await new UserService().logout(userId);
      res.status(200).json({
        message: response,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while logging out." });
    }
  }
}
