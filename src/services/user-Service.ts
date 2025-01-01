import { IUser, ICreateUser, IUpdateUser, IDeleteUser, IReadUser } from "../model/user-Model";
import { PrismaClient } from "@prisma/client"; // Import Prisma Client
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
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
        roleId: 2
      },
    });
    return newUser;
  }

  // Read user(s)
  async readUser(query: IReadUser): Promise<IUser | IUser[]> {
    if (query.id) {
      const user = await prisma.user.findUnique({
        where: { id: query.id },
        include: { role: true, reviews: true }, // Include relations
      });
      if (!user) throw new Error(`User with ID ${query.id} not found`);
      return user;
    } else {
      const users = await prisma.user.findMany({
        include: { role: true, reviews: true }, // Include relations
      });
      return users;
    }
  }

  // Update a user
  async updateUser(data: IUpdateUser): Promise<IUser> {
    const updatedUser = await prisma.user.update({
      where: { id: data.id },
      data: {
        username: data.username,
        email: data.email,
        password: data.password,
        token: data.token,
        roleId: data.roleId,
      },
    });
    return updatedUser;
  }

  // Delete a user
  async deleteUser(data: IDeleteUser): Promise<IUser> {
    const deletedUser = await prisma.user.delete({
      where: { id: data.id },
    });
    return deletedUser;
  }

  // Login a user
  async login(email: string, password: string): Promise<IUser> {
    // Temukan user berdasarkan email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new ResponseError(400, "Invalid email or password");
    }

    // Bandingkan password yang dimasukkan dengan yang disimpan (hashed)
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new ResponseError(400, "Invalid email or password");
    }

    // Generate token baru
    const newToken = uuid();

    // Update user dengan token baru
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { token: newToken },
    });

    return updatedUser;
  }

  // Logout a user
  async logout(userId: number): Promise<string> {
    await prisma.user.update({
      where: { id: userId },
      data: { token: "" }, // Clear the token
    });
    return "Logged out successfully";
  }
}
