import express from "express"
import { StripeController } from "../controllers/stripe.controller";
import { cookieAuthenticationMiddleware } from "../middleware/cookieAuthentication.middleware";

const router = express.Router();

router.route("/checkout")
      .post(cookieAuthenticationMiddleware, StripeController.paymentCheckout);

export default router;