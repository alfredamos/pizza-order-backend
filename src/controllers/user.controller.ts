import { User } from "@prisma/client";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { UserDb } from "../db/user.db";

export class UserController {
  static deleteUserById = async (req: Request, res: Response) => {
    //----> Get the cart item id from params.
    const { id } = req.params;
    //----> Delete the cart item from the database.
    const deletedUser = await UserDb.deletedUser(id);
    //----> Send back the response.
    res.status(StatusCodes.OK).json(deletedUser);
  }; 

  static getAllUsers = async (req: Request, res: Response) => {
    //----> Get all cart items from the database.
    const users = await UserDb.getAllUsers();
    //----> Send back the response.
    res.status(StatusCodes.OK).json(users);
  };

  static getUserById = async (req: Request, res: Response) => {
    //----> Get the cart item id from params.
    const { id } = req.params;
    //----> Retrieve cart item from database.
    const user = await UserDb.detailUser(id);
    //----> Send back the response back.
    res.status(StatusCodes.OK).json(user);
  };
}
