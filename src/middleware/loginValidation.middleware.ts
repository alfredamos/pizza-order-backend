import { NextFunction, Request, Response } from "express";
import { validateWithZodSchema } from "../validations/zodSchema.validation";
import catchError from "http-errors";
import { LoginModel } from "../models/login.model";
import { loginSchema } from "../validations/auth.validation";
import { StatusCodes } from "http-status-codes";

export function loginValidationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  //----> Get the change password payload.
  const login = req.body as LoginModel;

  //----> Check the validity of the change password payload.
  const validLogin = validateWithZodSchema(
    loginSchema,
    login
  );

  if (!validLogin) {
   throw catchError(StatusCodes.BAD_REQUEST, "Please provide all required values!");
  }

  next();
  return validLogin;
}
