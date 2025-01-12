import express from "express"
import { StripeController } from "../controllers/stripe.controller";
import { authenticationMiddleware } from "../middleware/authentication.middleware";

const router = express.Router();

router.route("/checkout")
      .post(authenticationMiddleware,StripeController.paymentCheckout);

export default router;