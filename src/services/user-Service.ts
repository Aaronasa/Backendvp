// user-Service.ts
import {
  IUser,
  ICreateUser,
  IUpdateUser,
  IDeleteUser,
  IReadUser,
} from "../model/user-Model";
import { PrismaClient } from "@prisma/client"; // Import Prisma Client
import bcrypt from "bcrypt";
import { ResponseError } from "../Error/response-error";

const prisma = new PrismaClient();

export class UserService {
  // Create a new user
  async createUser(data: ICreateUser): Promise<IUser> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,
        roleId: 2,
      },
    });
    return newUser;
  }

  // Read all users
  async readAllUsers(): Promise<IUser[]> {
    const users = await prisma.user.findMany({
      include: { role: true, reviews: true }, // Include relations
    });
    return users;
  }

  // Read a user by ID (for logged-in user)
  async readUserByToken(email: string, token: string): Promise<IUser | null> {
    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
      include: { role: true, reviews: true }, // Include relations if needed
    });

    // Check if the user exists and if the token matches
    if (user && user.token === token) {
      return user; // Return the user if token matches
    }

    return null; // If no user or token doesn't match, return null
  }

  // Update a user
  async updateUser(userId: number, username: string, email: string): Promise<IUser> {
    // Ensure that the email is unique
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser && existingUser.id !== userId) {
      throw new ResponseError(400, "Email is already taken.");
    }

    // Update the user in the database
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { username, email },
    });

    return updatedUser;
  }

  async getUserById(userId: number): Promise<IUser | null> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { role: true, reviews: true }, // Include any related data
    });
    return user;
  }

  // Delete a user
  async deleteUser(userId: number): Promise<IUser> {
    const deletedUser = await prisma.user.delete({
      where: { id: userId },
    });
    return deletedUser;
  }

  // Login a user
  async login(email: string, password: string): Promise<IUser> {
    const user = await prisma.user.findUnique({
      where: { email },
    });
  
    if (!user) {
      throw new ResponseError(400, "Invalid email or password");
    }
    const newToken = this.generateToken(32);
  
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new ResponseError(400, "Invalid email or password");
    }
    user.token = newToken;
    await prisma.user.update({
      where: { id: user.id },
      data: { token: newToken },
    });
  
    console.log(`User ${email} logged in. Token: ${user.token}`); // Log token
    return user;
  }
  

  // Logout a user
  async logout(userId: number): Promise<string> {
    await prisma.user.update({
      where: { id: userId },
      data: { token: "" }, // Clear the token
    });
    return "Logged out successfully";
  }

  private generateToken(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let newtoken = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      newtoken += characters[randomIndex];
    }
    return newtoken;
  }
}
