import { NextFunction, Request, Response } from "express";
import { validateWithZodSchema } from "../validations/zodSchema.validation";
import catchError from "http-errors";
import { Order } from "@prisma/client";
import { orderSchema } from "../validations/order.validation";
import { StatusCodes } from "http-status-codes";

export function orderValidationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  //----> Get the change password payload.
  const order = req.body as Order;

  //----> Check the validity of the change password payload.
  const validOrder = validateWithZodSchema(orderSchema, order);

  if (!validOrder) {
    throw catchError(
      StatusCodes.BAD_REQUEST,
      "Please provide all required values!"
    );
  }

  next();
  return validOrder;
}
