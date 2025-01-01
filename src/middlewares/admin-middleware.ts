import { NextFunction, Response } from "express";
import { UserRequest } from "../types/user-request";
import { ResponseError } from "../Error/response-error";
import { prismaClient } from "../application/database";

// Admin-only route - requires authentication and admin role
export const adminMiddleware = async (req: UserRequest, res: Response, next: NextFunction) => {
  const token = req.get("x-API-Token");

  if (token) {
    const user = await prismaClient.user.findFirst({
      where: {
        token: token,
      },
      include: { // Include role to access the role's name
        role: true,
      },
    });

    if (user) {
      if (user.role && user.role.name === "admin") { // Check if user has 'admin' role
        req.user = user; // Attach user data to the request
        next(); // Proceed to the next middleware or controller
        return;
      } else {
        next(new ResponseError(403, "Access denied. Admins only."));
      }
    } else {
      next(new ResponseError(403, "You are not authorized to access this resource"));
    }
  } else {
    next(new ResponseError(401, "No token provided"));
  }
};
