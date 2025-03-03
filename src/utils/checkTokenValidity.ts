import { StatusCodes } from "http-status-codes";
import * as jwt from "jsonwebtoken";
import catchError from "http-errors";


export const checkToKenValidity = (token: string) => {
//----> Verify the jwt-token
    const verifiedToken = jwt?.verify(token, process.env.JWT_TOKEN_SECRET);
    
    //----> Check for empty string.
    if(!verifiedToken){
      return catchError(StatusCodes.UNAUTHORIZED, "Invalid credentials!");
    
    }

    //----> Return JwtToken
    return verifiedToken;
    
  }
