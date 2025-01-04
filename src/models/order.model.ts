export class OrderModel{
  id: string = "";
    paymentId: string = "";
    userId: string = "";
    totalPrice: number = 0;
    isDelivered?: boolean = false;
    isPending?: boolean = true;
    isShipped?: boolean = false;
    totalQuantity: number = 0;
    orderDate: Date = new Date();
}