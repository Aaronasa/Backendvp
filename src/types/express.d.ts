// types/express.d.ts
import { IUser } from "../model/user-Model";  // Adjust import path as needed

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}