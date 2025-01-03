import { NextFunction, Response } from "express";
import { UserRequest } from "../types/user-request";
import { ResponseError } from "../Error/response-error";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export const authMiddleware = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  let token = req.get("x-API-Token"); // Get token from header
  console.log("authMiddleware: Token received:", token);

  if (!token) {
    console.error("No token provided in the request headers.");
    return next(new ResponseError(401, "No token provided"));
  }

  // Split token if it's comma-separated and take the first value
  if (token.includes(',')) {
    console.warn('authMiddleware: Multiple tokens detected:', token);
    token = token.split(',')[0].trim(); // Use the first token and trim whitespace
  }

  console.log('authMiddleware: Token after sanitization:', token);

  try {
    const user = await prismaClient.user.findFirst({
      where: { token }, // Check token against database
      include: { role: true }, // Include role data
    });

    console.log("authMiddleware: User retrieved from database:", user);

    if (!user) {
      console.error(`Token mismatch. Received token: ${token}`);
      return next(new ResponseError(403, "You are not authorized to access this resource"));
    }

    req.user = user; // Attach user to request
    next(); // Proceed to next middleware/route
  } catch (error) {
    console.error("Error in authMiddleware:", error);
    next(new ResponseError(500, "Internal Server Error"));
  }
};

