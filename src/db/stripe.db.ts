import Stripe from "stripe";
import { OrderPayload } from "../models/orderPayload.model";

export class StripeDb {
  stripe: Stripe;

  constructor(){
    //-----> Load stripe
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }

  async paymentCheckout(orderPayload: OrderPayload) {
    //----> Destructure orderPayload.
    const { cartItems } = orderPayload;

    const session = await this.stripe.checkout.sessions.create({
      line_items: [
        ...cartItems?.map((cart) => ({
          price_data: {
            currency: "usd",
            product_data: {
              name: cart.name,
              images: [cart.image],
            },
            unit_amount: cart.price * 100,
          },
          quantity: cart.quantity,
        })),
      ],
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.BASE_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.BASE_URL}/payment-failure`,
    });

    const { id, url, status, } = session;

    return { id, url, status };
  }

}

export const stripeDb = new StripeDb();