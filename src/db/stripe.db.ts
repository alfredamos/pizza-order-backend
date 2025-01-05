import Stripe from "stripe";
import { OrderPayload } from "../models/orderPayload.model";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export class StripeDb {
  static async paymentCheckout(orderPayload: OrderPayload) {
    //----> Destructure orderPayload.
    const { cartItems } = orderPayload;

    const session = await stripe.checkout.sessions.create({
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

    const { id, url, status } = session;

    return { id, url, status };
  }
}
