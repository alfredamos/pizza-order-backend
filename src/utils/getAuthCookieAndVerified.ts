import { Request, Response } from "express";
import { getAuthCookie } from "./getAuthCookie";
import { checkToKenValidity } from "./checkTokenValidity";
import { StatusCodes } from "http-status-codes";
import catchError from "http-errors";
import { TokenJwt } from "../models/TokenJwt";

export const getAuthCookieAndVerified = (req: Request, res: Response) => {
//----> Get the auth-cookie-object..
  const authCookieObject = getAuthCookie(req, res);

  //----> Get the verified token.
  //----> Get jwt-token.
    const {token} = authCookieObject;

  //----> Check for empty token.
  if(!token){
     throw catchError(
          StatusCodes.UNAUTHORIZED,
          "Invalid credentials!"
        );
  }

  //-----> Check for validity of token.
  const verifiedToken = checkToKenValidity(token);

  //---->Check for empty token
      if(!verifiedToken){
      throw catchError(
            StatusCodes.UNAUTHORIZED,
            "Invalid credentials!"
          );
      }
  
    //----> Get token object value (consisting of id, name, role etc)
      const jwtToken = verifiedToken as TokenJwt;
    
    //----> return the jwt-token-object.
    return jwtToken;
}