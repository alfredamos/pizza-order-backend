import express from "express";
import { idCheckValidationMiddleware } from "../middleware/idCheckValidation.middleware";
import { CartItemController } from "../controllers/cartItem.controller";
import { cartItemValidationMiddleware } from "../middleware/cartItemValidation.middleware";
import { cookieAuthenticationMiddleware } from "../middleware/cookieAuthentication.middleware";
import { cookieAdminMiddleware } from "../middleware/cookieAdmin.middleware";

const router = express.Router();

router.param("id", idCheckValidationMiddleware);

router
  .route("/")
  .get(cookieAuthenticationMiddleware, cookieAdminMiddleware, CartItemController.getAllCartItems)
  .post(cartItemValidationMiddleware, CartItemController.createCartItem);

router
  .route("/:id")
  .delete(cookieAuthenticationMiddleware, CartItemController.deleteCartItemById)
  .get(cookieAuthenticationMiddleware, CartItemController.getCartItemById)
  .patch(cartItemValidationMiddleware, cookieAuthenticationMiddleware, CartItemController.editCartItemById);

export default router;
