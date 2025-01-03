import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import catchError from "http-errors";
import { StatusCodes } from "http-status-codes";

export function authenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req?.headers?.authorization;

  //----> Check for availability of token
  const hasToken = authorization?.startsWith("Bearer");

  //----> Not authorized
  if (!hasToken) {
    throw catchError(
      StatusCodes.UNAUTHORIZED,
      "Invalid credentials!"
    );
  }

  //----> Retrieve token
  const authToken = authorization?.split(" ")[1];

  if (!authToken) {
    throw catchError(StatusCodes.UNAUTHORIZED, "Invalid credentials!");
  }

  authenticator(authToken)
    .then((user) => {
      req["user"] = user;

      next();
    })
    .catch((_) => {
      throw catchError(StatusCodes.FORBIDDEN, "Invalid credentials");
    });
}

async function authenticator(tokenToVerify: string) {
  return jwt?.verify(tokenToVerify, process.env.JWT_TOKEN_SECRET!);
}
