import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchError from "http-errors";
import { getAuthCookieAndVerified } from "../utils/getAuthCookieAndVerified";
import { isAuthorizedRole } from "../utils/isAuthorizedRole";

export function cookieAuthenticationMiddleware(req: Request, res: Response, next: NextFunction){
  //----> Get the auth-cookie-object, token and verified the token.
  const jwtToken = getAuthCookieAndVerified(req, res); 
  
  //----> Get the user role from the token object.
  const userRole = jwtToken?.role;
  const isName = jwtToken?.name;
  const userId = jwtToken?.id;
  //----> Check for authorized-user.
  const isAuthorizedUser = isAuthorizedRole(userRole);

  //----> Permit or reject user.
  if (isAuthorizedUser && isName && userId){
    console.log("In authentication-cookie : ", {isAuthorizedUser, isName, userId});
    next();
  }else{
       throw catchError(StatusCodes.UNAUTHORIZED, "Invalid credentials");
  }

}



