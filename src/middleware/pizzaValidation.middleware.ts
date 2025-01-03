import { NextFunction, Request, Response } from "express";
import { validateWithZodSchema } from "../validations/zodSchema.validation";
import catchError from "http-errors";
import { Pizza } from "@prisma/client";
import { pizzaSchema } from "../validations/pizza.validation";
import { StatusCodes } from "http-status-codes";

export function pizzaValidationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  //----> Get the change password payload.
  const pizza = req.body as Pizza;

  //----> Check the validity of the change password payload.
  const validPizza = validateWithZodSchema(pizzaSchema, pizza);

  if (!validPizza) {
    throw catchError(
      StatusCodes.BAD_REQUEST,
      "Please provide all required values!"
    );
  }

  next();
  return validPizza;
}
