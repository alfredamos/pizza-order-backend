import { Request, Response, NextFunction } from "express";
import catchError from "http-errors";
import { StatusCodes } from "http-status-codes";
import { AuthUserModel } from "../models/authUser.model";

export function authorizationMiddleware(...roles: string[]){
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req["user"] as AuthUserModel;
    const role = token?.role;
    const isCorrectRole = roles.includes(role);

    if (!isCorrectRole) {
      throw catchError(
        StatusCodes.FORBIDDEN,
        "You are not authorized to view or perform this task!"
      );
    }
    next();
    return isCorrectRole;
  };

}
  