import { CartItem } from "@prisma/client";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { CartItemDb } from "../db/cartItem.db";

export class CartItemController {
  static createCartItem = async (req: Request, res: Response) => {
    //----> Get the cart item from the request.
    const newCartItem = req.body as CartItem;
    //----> Store the new cart item in the database.
    const createdCartItem = await CartItemDb.createCartItem(newCartItem);
    //----> Send back the response.
    res.status(StatusCodes.CREATED).json(createdCartItem);
  };

  static deleteCartItemById = async (req: Request, res: Response) => {
    //----> Get the cart item id from params.
    const { id } = req.params;
    //----> Delete the cart item from the database.
    const deletedCartItem = await CartItemDb.deletedCartItem(id);
    //----> Send back the response.
    res.status(StatusCodes.OK).json(deletedCartItem);
  };

  static editCartItemById = async (req: Request, res: Response) => {
    //----> Get the cart item id from params.
    const { id } = req.params;
    //----> Get the cart item to update from request.
    const cartItemToUpdate = req.body;
    //----> Delete the cart item from the database.
    const editedCartItem = await CartItemDb.editCartItem(id, cartItemToUpdate);
    //----> Send back the response.
    res.status(StatusCodes.OK).json(editedCartItem);
  };

  static getAllCartItems = async (req: Request, res: Response) => {
    //----> Get all cart items from the database.
    const cartItems = await CartItemDb.getAllCartItems();
    //----> Send back the response.
    res.status(StatusCodes.OK).json(cartItems);
  };

  static getCartItemById = async (req: Request, res: Response) => {
    //----> Get the cart item id from params.
    const { id } = req.params;
    //----> Retrieve cart item from database.
    const cartItem = await CartItemDb.detailCartItem(id);
    //----> Send back the response back.
    res.status(StatusCodes.OK).json(cartItem);
  };
}
