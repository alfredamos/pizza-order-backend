import {Request, Response, NextFunction} from "express";

export const selfAuthenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const {idFromParams} = req.params
}