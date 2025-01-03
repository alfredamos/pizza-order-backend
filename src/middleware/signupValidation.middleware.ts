import { NextFunction, Request, Response } from "express";
import { validateWithZodSchema } from "../validations/zodSchema.validation";
import catchError from "http-errors";
import { SignupModel } from "../models/signup.model";
import { signupSchema } from "../validations/auth.validation";
import { StatusCodes } from "http-status-codes";

export function signupValidationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  //----> Get the change password payload.
  const signup = req.body as SignupModel;

  //----> Check the validity of the change password payload.
  const validSignup = validateWithZodSchema(
    signupSchema,
    signup
  );

  if (!validSignup) {
    throw catchError(
      StatusCodes.BAD_REQUEST,
      "Please provide all required values!"
    );
  }

  next();
  return validSignup;
}
