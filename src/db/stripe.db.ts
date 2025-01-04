import { CartItem } from "@prisma/client";
import Stripe from "stripe";
import { OrderPayload } from "../models/orderPayload.model";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export class StripeDb {
  static async paymentCheckout(orderPayload: OrderPayload) {
    //----> Destructure orderPayload.
    const {cartItems: carts} = orderPayload;
    const session = await stripe.checkout.sessions.create({
      line_items: [
        ...carts?.map((cart) => ({
          price_data: {
            currency: "usd",
            product_data: {
              name: cart.name,
              images: [...cart.image],
            },
            unit_amount: cart.price * 100,
          },
          quantity: 1,
        })),
      ],
      mode: "payment",
      success_url: `${process.env.BASE_URL}/payment-success?sessionId={CHECKOUT_SESSION}`,
      cancel_url: `${process.env.BASE_URL}/payment-failure`,
    });

    const {id, url, status} = session;  

    return {id, url, status} 
  }
}
