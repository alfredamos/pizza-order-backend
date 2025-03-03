import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchError from "http-errors";
import { ResponseAuth } from "../models/CookieResponse";


export const getAuthCookie = (req: Request, _res: Response) => {
//----> Get auth-cookie.
  const authCookie = req.cookies['auth'];

  //----> Check for existence of auth cookie.
  if(!authCookie){
     throw catchError(
          StatusCodes.UNAUTHORIZED,
          "Invalid credentials!"
        );
  }

  //----> Extract the cookie object from string values.
    const authCookieObject = JSON.parse(authCookie) as ResponseAuth;

  //----> Return the cookie-object.
  return authCookieObject;

}