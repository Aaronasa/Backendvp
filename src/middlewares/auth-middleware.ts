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
  console.log("Received Token from request header:", token); // Log token yang diterima

  if (token) {
    try {
      // Cek apakah pengguna dengan token ini ada di database
      const user = await prismaClient.user.findFirst({
        where: {
          token: token, // Memeriksa apakah token ada di database
        },
        include: {
          role: true, // Termasuk data role pengguna
        },
      });

      if (user) {
        // Menambahkan log untuk memeriksa data pengguna
        console.log("User found in database:", user);
        console.log("User roleId from database:", user.roleId);

        // Periksa apakah roleId pengguna sesuai dengan yang diharapkan
        if (user.roleId === 2) {  // Misalnya, roleId yang valid adalah 2
          req.user = user; // Menambahkan data pengguna ke request
          next(); // Lanjutkan ke middleware atau handler berikutnya
        } else {
          // Role pengguna tidak sesuai
          console.log("User roleId is not authorized:", user.roleId);
          next(new ResponseError(403, "You do not have the necessary role"));
        }
      } else {
        // Token tidak ditemukan di database
        console.log("Token not found in database");
        next(new ResponseError(403, "You are not authorized to access this resource"));
      }
    } catch (error) {
      // Error saat melakukan query ke database
      console.error("Error in authMiddleware:", error);
      next(new ResponseError(500, "Internal Server Error"));
    }
  } else {
    // Token tidak diberikan
    console.log("No token provided");
    next(new ResponseError(401, "No token provided"));
  }
};