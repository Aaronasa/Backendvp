import { Request, Response } from "express";
import { IUser, ICreateUser, IUpdateUser, IDeleteUser, ILoginUser, ILogoutUser } from "../model/user-Model";
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
            res.status(500).json({ error: "An error occurred while creating the user." });
        }
    }

    // Read User(s)
    static async readUser(req: Request, res: Response): Promise<void> {
        try {
            const id = req.query.id ? parseInt(req.query.id as string, 10) : undefined;
            const response: IUser | IUser[] = await new UserService().readUser({ id });
            res.status(200).json({
                message: "User successfully retrieved.",
                data: response,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "An error occurred while retrieving the user." });
        }
    }

    // Update User (Requires Auth)
    static async updateUser(req: UserRequest, res: Response): Promise<void> {
        try {
            const userId = req.user?.id; // Ensure the user is logged in and we have access to their ID
            
            if (userId === undefined) {
                // If userId is undefined, throw an error or return an appropriate response
                res.status(400).json({ error: "User is not authenticated or missing ID." });
                return;
            }

            const request: IUpdateUser = req.body as IUpdateUser;

            // Pass the userId explicitly, making sure it's a valid number
            const response: IUser = await new UserService().updateUser({ ...request, id: userId });
            res.status(200).json({
                message: "User successfully updated.",
                data: response,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "An error occurred while updating the user." });
        }
    }

    // Delete User (Requires Auth)
    static async deleteUser(req: UserRequest, res: Response): Promise<void> {
        try {
            const userId = req.user?.id; // Ensure the user is logged in and we have access to their ID

            if (userId === undefined) {
                // If userId is undefined, throw an error or return an appropriate response
                res.status(400).json({ error: "User is not authenticated or missing ID." });
                return;
            }

            const request: IDeleteUser = req.body as IDeleteUser;

            // Pass the userId explicitly, making sure it's a valid number
            const response: IUser = await new UserService().deleteUser({ ...request, id: userId });
            res.status(200).json({
                message: "User successfully deleted.",
                data: response,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "An error occurred while deleting the user." });
        }
    }

    // Login User
    static async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password }: ILoginUser = req.body as ILoginUser;
            const response = await new UserService().login(email, password);
            res.status(200).json({
                message: "Login successful.",
                data: response,
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
                res.status(401).json({ error: error.message || "Invalid email or password." });
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
