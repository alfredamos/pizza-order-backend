import { Pizza } from "@prisma/client";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { PizzaDb } from "../db/pizza.db";

export class PizzaController {
  static createPizza = async (req: Request, res: Response) => {
    //----> Get the cart item from the request.
    const newPizza = req.body as Pizza;
    //----> Store the new cart item in the database.
    const createdPizza = await PizzaDb.createPizza(newPizza);
    //----> Send back the response.
    res.status(StatusCodes.CREATED).json(createdPizza);
  };

  static deletePizzaById = async (req: Request, res: Response) => {
    //----> Get the cart item id from params.
    const { id } = req.params;
    //----> Delete the cart item from the database.
    const deletedPizza = await PizzaDb.deletedPizza(id);
    //----> Send back the response.
    res.status(StatusCodes.OK).json(deletedPizza);
  };

  static editPizzaById = async (req: Request, res: Response) => {
    //----> Get the cart item id from params.
    const { id } = req.params;
    //----> Get the cart item to update from request.
    const pizzaToUpdate = req.body;
    //----> Delete the cart item from the database.
    const editedPizza = await PizzaDb.editPizza(id, pizzaToUpdate);
    //----> Send back the response.
    res.status(StatusCodes.OK).json(editedPizza);
  };

  static getAllPizzas = async (req: Request, res: Response) => {
    //----> Get all cart items from the database.
    const pizzas = await PizzaDb.getAllPizzas();
    //----> Send back the response.
    res.status(StatusCodes.OK).json(pizzas);
  };

  static getPizzaById = async (req: Request, res: Response) => {
    //----> Get the cart item id from params.
    const { id } = req.params;
    //----> Retrieve cart item from database.
    const pizza = await PizzaDb.detailPizza(id);
    //----> Send back the response back.
    res.status(StatusCodes.OK).json(pizza);
  };
}
