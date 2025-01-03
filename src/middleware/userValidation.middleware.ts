import { NextFunction, Request, Response } from "express";
import { validateWithZodSchema } from "../validations/zodSchema.validation";
import catchError from "http-errors";
import { User } from "@prisma/client";
import { userSchema } from "../validations/user.validation";
import { StatusCodes } from "http-status-codes";

export function userValidationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  //----> Get the change password payload.
  const user = req.body as User;

  //----> Check the validity of the change password payload.
  const validUser = validateWithZodSchema(userSchema, user);

  if (!validUser) {
    throw catchError(
      StatusCodes.BAD_REQUEST,
      "Please provide all required values!"
    );
  }

  next();
  return validUser;
}
