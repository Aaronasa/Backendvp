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
      // `req.user` is populated by `authMiddleware`
      const user = req.user;
  
      if (!user) {
        console.error("User not found in the request.");
        res.status(403).json({ error: "You are not authorized to access this resource." });
        return;
      }
  
      // Validate the email matches the authenticated user
      const email = req.body.email;
      if (!email || email !== user.email) {
        console.error("Email does not match the authenticated user.");
        res.status(400).json({ error: "Invalid email address." });
        return;
      }
  
      // Respond with user data
      res.status(200).json({
        message: "User successfully retrieved.",
        data: {
          id: user.id,
          username: user.username,
          email: user.email,
          token: user.token,
        },
      });
    } catch (error) {
      console.error("Error in readUserByToken:", error);
      res.status(500).json({ error: "An error occurred while retrieving the user." });
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
  static async updateUser(req: UserRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(400).json({ error: "User is not authenticated." });
        return;
      }

      const { username, email }: IUpdateUser = req.body;
      if (!username || !email) {
        res.status(400).json({ error: "Username and email are required." });
        return;
      }

      // Call service to update the user
      const updatedUser = await new UserService().updateUser(userId, username, email);

      res.status(200).json({
        message: "User updated successfully.",
        data: updatedUser,
      });
    } catch (error) {
      console.error("Error in updateUser:", error);
      res.status(500).json({ error: "An error occurred while updating the user." });
    }
  }

}
