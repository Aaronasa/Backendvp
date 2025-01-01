import { Request } from "express";
import { IUser } from "../model/user-Model";  // Adjust the import based on your actual file structure

export interface UserRequest extends Request {
  user?: IUser; 
}