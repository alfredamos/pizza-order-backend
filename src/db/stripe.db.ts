import { CartItem } from "@prisma/client";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export class StripeDb {
  static async paymentCheckout(carts: CartItem[]) {
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

    const {id, url, status} = session
  

    return {id, url, status} 
  }
}
