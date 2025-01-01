import { NextFunction, Response } from "express";
import { UserRequest } from "../types/user-request";
import { ResponseError } from "../Error/response-error";
import { prismaClient } from "../application/database";

export const authMiddleware = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.get("x-API-Token");

  if (token) {
    try {
      const user = await prismaClient.user.findFirst({
        where: {
          token: token, // Check if the token matches the one in the database
        },
        include: {
          role: true, // Include the related role data for user
        },
      });

      if (user) {
        req.user = user; // Attach user data to the request object
        next(); // Proceed to the next middleware or route handler
        return;
      } else {
        // Token doesn't match any user
        next(new ResponseError(403, "You are not authorized to access this resource"));
      }
    } catch (error) {
      // Error during database query
      console.error("Error in authMiddleware:", error);
      next(new ResponseError(500, "Internal Server Error"));
    }
  } else {
    // Token is not provided
    next(new ResponseError(401, "No token provided"));
  }
};
