import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchError from "http-errors";
import { getAuthCookieAndVerified } from "../utils/getAuthCookieAndVerified";
import { isAuthorizedRole } from "../utils/isAuthorizedRole";
import { isAdminRole } from "../utils/isAdminRole";

export function cookieAdminMiddleware(req: Request, res: Response, next: NextFunction){
  //----> Get the auth-cookie-object, token and verified the token.
  const jwtToken = getAuthCookieAndVerified(req, res); 

  //----> Get the user-info.
  const userRole = jwtToken?.role;
  const name = jwtToken?.name;
  const userId = jwtToken?.id;

  //----> Check for admin-user.
  const isAdmin = isAdminRole(userRole);

  //----> Validate user is admin.
  if(isAdmin && name && userId){
    console.log("In admin-cookie : ", {isAdmin, name, userId});
    next();
  }else {
    throw catchError(StatusCodes.FORBIDDEN, "You are not permitted on this page!");
  }
}