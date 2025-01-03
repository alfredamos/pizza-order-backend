import { NextFunction, Request, Response } from "express";
import {UuidTool} from "uuid-tool";
import catchError from 'http-errors';
import { StatusCodes } from "http-status-codes";


export function idCheckValidationMiddleware(req: Request, res: Response, next: NextFunction){
  const {id} = req.params;

  const isValidId = UuidTool.isUuid(id);

  if (!isValidId){
    throw catchError(StatusCodes.BAD_REQUEST, "Invalid id, please provide a valid id!");   
  }

  next();
}