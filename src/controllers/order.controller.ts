import { Order } from "@prisma/client";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { orderDb } from "../db/order.db";
import { OrderProduct } from "../models/orderProduct.model";
import { OrderPayload } from "../models/orderPayload.model";

export class OrderController {
  static createOrder = async (req: Request, res: Response) => {
    //----> Get the order info from the request body.
    const orderPayload = req.body as OrderPayload;

    //----> Store the new order info in the database.
    const createdOrder = await orderDb.createOrder(orderPayload);

    //----> Send back the response.
    res.status(StatusCodes.CREATED).json(createdOrder);
  };

  static orderCreate = async (req: Request, res: Response) => {
    //----> Get the order info from the request body.
    const orderPayload = req.body as OrderPayload;

    //----> Store the new order info in the database.
    const payloadOfOrder = await orderDb.orderCreate(orderPayload);

    //----> Send back the response.
    res.status(StatusCodes.CREATED).json(payloadOfOrder);
  };

  static deleteOrderById = async (req: Request, res: Response) => {
    //----> Get the order id from params.
    const { id } = req.params;
    //----> Delete all associated cart-items.
    const deletedOrder = await orderDb.deleteOrderById(id);
    //----> Send back the response.
    res.status(StatusCodes.OK).json(deletedOrder);
  };

  static deleteOrdersByUserId = async (req: Request, res: Response) => {
    const { userId } = req.params; //----> Get the customer-id;
    console.log("I'm in delete all orders by customerId", { userId });

    //----> Delete orders user id.
    await orderDb.deleteOrdersByUserId(userId);
    //----> Send back the response.
    res.status(StatusCodes.OK).json({
      message:
        "All Orders associated with this customer have been deleted successfully!",
    });
  };

  static editOrderById = async (req: Request, res: Response) => {
    const { id } = req.params;
    //----> Get the order payload to edit from request.
    const orderToEdit = req.body as Order;
    //----> Store the edited order info in the database.
    const editedOrder = await orderDb.editOrder(id, orderToEdit);
    //----> Send back the response.
    res.status(StatusCodes.OK).json(editedOrder);
  };

  static getAllOrders = async (req: Request, res: Response) => {
    //----> Get all the orders from the database.
    const allOrders = await orderDb.getAllOrders();

    //----> Send back the response.
    res.status(StatusCodes.OK).json(allOrders);
  };

  static getAllOrdersByUserId = async (req: Request, res: Response) => {
    //----> Get query params.
    const { userId } = req.params;
    //----> Get all orders from the database.
    const allOrders = await orderDb.getAllOrdersByUserId(userId);
    //----> Send back the response.
    res.status(StatusCodes.OK).json(allOrders);
  };

  static getOrderById = async (req: Request, res: Response) => {
    const { id } = req.params;
    //----> Check for the existence of order in the db.
    const order = await orderDb.getOneOrder(id);

    //----> Send back the response.
    res.status(StatusCodes.OK).json(order);
  };

  static orderDelivered = async (req: Request, res: Response) => {
    //----> Extract the order id from params.
    const { orderId } = req.params;
    console.log("Order delivered!!!");

    //----> Update the delivering information.
    const updatedOrder = await orderDb.orderDelivered(orderId);
    //----> Send back the response
    res.status(StatusCodes.OK).json(updatedOrder);
  };

  static orderShipped = async (req: Request, res: Response) => {
    //----> Extract the order id from params.
    const { orderId } = req.params;
    console.log("Order Shipped!!!");

    //----> Update the shipping information.
    const updatedOrder = await orderDb.orderShipped(orderId);
    //----> Send back the response
    res.status(StatusCodes.OK).json(updatedOrder);
  };
}
