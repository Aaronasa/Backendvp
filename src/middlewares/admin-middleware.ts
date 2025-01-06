import { NextFunction, Response } from "express";
import { UserRequest } from "../types/user-request";
import { ResponseError } from "../Error/response-error";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export const adminMiddleware = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  let token = req.get("x-API-Token"); // Get token from header
  console.log("adminMiddleware: Token received:", token);

  if (!token) {
    console.error("No token provided in the request headers.");
    return next(new ResponseError(401, "No token provided"));
  }

  // Split token if it's comma-separated and take the first value
  if (token.includes(',')) {
    console.warn("adminMiddleware: Multiple tokens detected:", token);
    token = token.split(',')[0].trim(); // Use the first token and trim whitespace
  }

  console.log("adminMiddleware: Token after sanitization:", token);

  try {
    const user = await prismaClient.user.findFirst({
      where: { token }, // Check token against database
      include: { role: true }, // Include role data
    });

    console.log("adminMiddleware: User retrieved from database:", user);

    if (!user) {
      console.error(`Token mismatch. Received token: ${token}`);
      return next(new ResponseError(403, "You are not authorized to access this resource"));
    }

    if (user.role?.name !== "admin") {
      console.warn(`User is not an admin. Role: ${user.role?.name}`);
      return next(new ResponseError(403, "Access denied. Admins only."));
    }

    req.user = user; // Attach user to request
    next(); // Proceed to the next middleware/route
  } catch (error) {
    console.error("Error in adminMiddleware:", error);
    next(new ResponseError(500, "Internal Server Error"));
  }
};
