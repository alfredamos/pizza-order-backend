import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchError from "http-errors";
import { UserRoleChangeModel } from "../models/userRoleChange.model";
import { validateWithZodSchema } from "../validations/zodSchema.validation";
import { roleChangeSchema } from "../validations/auth.validation";

export function roleUserValidationMiddleware(req: Request, res: Response, next: NextFunction){
  const userRole = req.body as UserRoleChangeModel;
  //----> Check the validity of the change password payload.
  const validUserRoleChange = validateWithZodSchema(roleChangeSchema, userRole);

  if (!validUserRoleChange) {
    throw catchError(
      StatusCodes.BAD_REQUEST,
      "Please provide all required values!"
    );
  }

  next();
  return validUserRoleChange;
}