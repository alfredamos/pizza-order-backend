import { StatusCodes } from "http-status-codes";
import prisma from "./prisma.db";
import { CartItem, Order, Status } from "@prisma/client";
import catchError from "http-errors";

export class OrderDb {
  constructor() {}

  async createOrder(cartItems: CartItem[], order: Order){
   

    //----> Get the total quantity and total price into order.
    console.log("Before modifier");
    const modifiedOrder = this.adjustTotalPriceAndTotalQuantity(
      order,
      cartItems
    );
    console.log("After modifier");
    console.log({ modifiedOrder, cartItems });
    //----> Store the new order info in the database.
    const createdOrder = await prisma.order.create({
      data: {
        ...modifiedOrder,
        orderDate: new Date(),
        cartItems: {
          create: [...(cartItems as CartItem[])],
        },
      },
      include: {
        cartItems: true,
      },
    });
    
    return createdOrder;
  };

  async deleteAllCartItemByOrderId(orderId: string){ 
    //----> Check for the existence of order in the database.
    const retrieveOrder = await this.getOrderById(orderId);
    //----> Adjust the total cost and total quantity on the order.
    const modifiedOrder = this.adjustTotalPriceAndTotalQuantity(retrieveOrder);
    //----> Delete the order info from the database.
    await prisma.order.update({
      where: { id: orderId },
      data: {
        ...modifiedOrder,
        cartItems: {
          deleteMany: {},
        },
      },
      include: {
        cartItems: true,
      },
    });
    //----> Clean up the order cart.
    await prisma.order.delete({ where: { id: orderId } });
   
  };

  async deleteOneCartItemByOrderId(cartItemId: string, orderId: string){   
    //----> Check for the existence of order in the database.
    const { cartItems, ...rest } = await this.getOrderById(orderId, true);
    //----> Filter out the cart-item to be deleted.
    const filteredCartItems = this.cartItemFilter(cartItems, cartItemId);
    //----> Adjust the total cost and total quantity on the order.
    const modifiedOrder = this.adjustTotalPriceAndTotalQuantity(
      rest,
      filteredCartItems
    );
    //----> Delete the order info from the database.
    const deletedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        ...modifiedOrder,
        cartItems: {
          deleteMany: [{ id: cartItemId }],
        },
      },
      include: {
        cartItems: true,
      },
    });
    
    return {deletedOrder, filteredCartItems};
  };

  async deleteOrderById(id: string){    
    //----> Check for the existence of order in the database.
    await this.getOrderById(id);
    //----> Delete all associated cart-items.
    await prisma.order.update({
      where: { id },
      data: {
        cartItems: {
          deleteMany: {},
        },
      },
      include: {
        cartItems: true,
      },
    });
    //----> Delete the order info from the database.
    const deletedOrder = await prisma.order.delete({ where: { id } });
    
    return deletedOrder;
  };  

  async deleteOrdersByUserId (userId: string){
    //----> Get the customer with the user-id.
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw catchError(StatusCodes.UNAUTHORIZED, "Invalid credentials!");
    }

    //----> Get all the orders by customerId.
    const orders = await prisma.order.findMany({
      where: { userId: user?.id },
    });
    //----> Delete all these others in the database.
    this.allOrdersDeletedByUserId(orders, user?.id);
    
  };

  async editAllCartItemsByOrderId(orderId: string, cartItems: CartItem[], order: Order){
    //----> Adjust the total-price and total-quantity on order.
    const modifiedOrder = this.adjustTotalPriceAndTotalQuantity(
      order,
      cartItems
    );
    //----> Store the edited order info in the database.
    const editedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { ...modifiedOrder },
    });
    //----> Edit all cart-items.
    const updatedCartItems = await this.updateAllCartItems(cartItems, orderId);   

    return {editedOrder, updatedCartItems}
  };

  async editOneCartItemByOrderId(cartItemId: string, orderId: string, cartItems: CartItem[]){   
    //----> Check for the existence of order in the db.
    const order = await this.getOrderById(orderId);
    
    //----> Massage cartItems.
    const cartItemsMod = this.cartItemsModInput(cartItems);
    //----> Filter out the cart-item to edit.
    const cartItemToEdit = this.findCartItem(cartItemsMod, cartItemId);

    //----> Adjust the total-cost and total-quantity on order.
    const modifiedOrder = this.adjustTotalPriceAndTotalQuantity(
      order,
      cartItemsMod
    );
    //----> Store the edited order info in the database.
    const editedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        ...modifiedOrder,
        cartItems: {
          update: {
            where: { id: cartItemId, orderId },
            data: { ...cartItemToEdit },
          },
        },
      },
      include: {
        cartItems: true,
      },
    });

    return editedOrder;
  };

  async editOrder(id: string, orderToEdit: Order){
    //----> Check for the existence of order in the db.
    await this.getOrderById(id);
    //----> Store the edited order info in the database.
    const editedOrder = await prisma.order.update({
      where: { id },
      data: { ...orderToEdit },
    });
    
    return editedOrder;
  };

  async getAllOrders(){
    //----> Get all the orders from the database.
    const allOrders = await prisma.order.findMany({
      include: { cartItems: true, user: true },
    });

    return allOrders;
  };

  async getAllOrdersByUserId(userId: string){
    //----> Get all the orders from the database.
    const allOrders = await prisma.order.findMany({
      where: { userId },
      include: {
        cartItems: true,
        user: true,
      },
    });

    return allOrders;
  };

  async getOneOrder(id: string){
    //----> Check for the existence of order in the db.
    const order = await this.getOrderById(id, true);

    return order;
  };

  async orderDelivered(orderId: string){
    console.log("Order delivered!!!");
    //----> Get the order.
    const order = (await this.getOrderById(orderId)) 

    if (!order.isShipped) {
      throw catchError(
        StatusCodes.BAD_REQUEST,
        "Order must be shipped before delivery, please ship the order!"
      );
    }
    //----> Update the order delivery info.
    const deliveredOrder = this.deliveryInfo(order);
    //----> Update the order delivery info in the database.
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        ...deliveredOrder,
      },
    });    

    return updatedOrder;
  };

  async orderShipped(orderId: string){
    console.log("Order shipped!!!");
    //----> Get the order.
    const order = (await this.getOrderById(orderId));
    //----> Update the shipping information.
    const shippedOrder = this.shippingInfo(order);
    console.log({ shippedOrder });
    //----> Update the order in the database.
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        ...shippedOrder,
      },
    });
   
    return updatedOrder;
  };

  private async getOrderById(id: string, include: boolean = false) {
    //----> Retrieve the order info with this id from database.
    const order = await prisma.order.findUniqueOrThrow({
      where: { id },
      include: {
        cartItems: include,
       
      },
    });
    //----> Send back a valid order.
    return order;
  }

  private shippingInfo(order: Order) {
    //----> Update the order shipping info.
    order.isShipped = true; //----> Order shipped.
    order.shippingDate = new Date(); //----> Order shipping date.
    order.status = Status.Shipped; //----> Order status.

    //----> Return the updated order.
    return order;
  }

  private deliveryInfo(order: Order) {
    //----> Update the order delivery info.
    order.isDelivered = true; //----> Order shipped.
    order.deliveryDate = new Date(); //----> Order shipping date.
    order.status = Status.Delivered; //----> Order status.
    //----> Return the updated order
    return order;
  }

  private findCartItem(cartItems: CartItem[], cartItemId: string): CartItem {
    return cartItems?.find((cartItem) => cartItem.id === cartItemId);
  }

  private cartItemFilter(
    cartItems: CartItem[],
    cartItemId: string
  ): CartItem[] {
    return cartItems?.filter((carItem) => carItem.id !== cartItemId);
  }

  private adjustTotalPriceAndTotalQuantity(
    order: Order,
    cartItems: CartItem[] = []
  ): Order {
    console.log({ order, cartItems });
    //----> Calculate both the total cost and total quantity.
    const totalQuantity = cartItems?.reduce(
      (acc, current) => acc + current.quantity,
      0
    );
    const totalPrice = cartItems?.reduce(
      (acc, current) => acc + current.price * current.quantity,
      0
    );
    //----> Adjust the total cost and total quantity on the order.
    order.totalPrice = totalPrice;
    order.totalQuantity = totalQuantity;
    //----> Return the modified order.
    return order;
  }

  private cartItemsModInput(cartItems: CartItem[]) {
    return cartItems?.map(({ id, name, price, quantity, pizzaId, orderId }) => {
      return { id, name, price, quantity, pizzaId, orderId };
    });
  }

  private updateAllCartItems(cartItems: CartItem[], orderId: string) {
    //----> Edit all cart-items at once.
    const editedAllCarItems = cartItems.map(async (cart) => {
      return await prisma.cartItem.update({
        where: { id: cart.id, orderId },
        data: { ...cart },
      });
    });

    //----> Collect all edited cart-items in Promise.all().
    const updatedCartItems = Promise.all(editedAllCarItems);

    //----> Return the updated cart-items.

    return updatedCartItems;
  }

  private allOrdersDeletedByUserId(orders: Order[], userId: string) {
    //----> Delete all orders by customerId
    const userOrders = orders?.filter(
      (order) => order.userId === userId
    );
    userOrders?.forEach(async (order) => {
      //----> Delete all associated cart-items.
      await prisma.order.update({
        where: { id: order.id },
        data: {
          cartItems: {
            deleteMany: {},
          },
        },
        include: {
          cartItems: true,
        },
      });
      //----> Delete the order info from the database.
      await prisma.order.delete({ where: { id: order.id } });
    });
  }
}

export const orderDb = new OrderDb();