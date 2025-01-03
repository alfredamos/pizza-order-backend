import { NextFunction, Request, Response } from "express";
import { validateWithZodSchema } from "../validations/zodSchema.validation";
import catchError from "http-errors";
import { EditProfileModel } from "../models/editProfile.model";
import { editProfileSchema } from "../validations/auth.validation";
import { StatusCodes } from "http-status-codes";

export function editProfileValidationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  //----> Get the change password payload.
  const editProfile = req.body as EditProfileModel;

  //----> Check the validity of the change password payload.
  const validEditProfile = validateWithZodSchema(
    editProfileSchema,
    editProfile
  );

  if (!validEditProfile) {
    throw catchError(
      StatusCodes.BAD_REQUEST,
      "Please provide all required values!"
    );
  }

  next();
  return validEditProfile;
}
