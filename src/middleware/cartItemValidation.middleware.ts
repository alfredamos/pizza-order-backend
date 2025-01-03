import { NextFunction, Request, Response } from "express";
import { validateWithZodSchema } from "../validations/zodSchema.validation";
import catchError from "http-errors";
import { CartItem } from "@prisma/client";
import { cartItemSchema } from "../validations/cartItem.validation";
import { StatusCodes } from "http-status-codes";

export function cartItemValidationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  //----> Get the change password payload.
  const cartItem = req.body as CartItem;

  //----> Check the validity of the change password payload.
  const validCartItem = validateWithZodSchema(
    cartItemSchema,
    cartItem
  );

  if (!validCartItem) {
    throw catchError(
      StatusCodes.BAD_REQUEST,
      "Please provide all required values!"
    );
  }

  next();
  return validCartItem;
}
