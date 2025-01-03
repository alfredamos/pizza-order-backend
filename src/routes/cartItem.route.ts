import express from "express";
import { idCheckValidationMiddleware } from "../middleware/idCheckValidation.middleware";
import { CartItemController } from "../controllers/cartItem.controller";
import { authenticationMiddleware } from "../middleware/authentication.middleware";
import { authorizationMiddleware } from "../middleware/authorization.middleware";
import { cartItemValidationMiddleware } from "../middleware/cartItemValidation.middleware";

const router = express.Router();

router.param("id", idCheckValidationMiddleware);

router
  .route("/")
  .get(authenticationMiddleware, authorizationMiddleware('Admin'), CartItemController.getAllCartItems)
  .post(cartItemValidationMiddleware, CartItemController.createCartItem);

router
  .route("/:id")
  .delete(authenticationMiddleware, CartItemController.deleteCartItemById)
  .get(authenticationMiddleware, CartItemController.getCartItemById)
  .patch(cartItemValidationMiddleware, authenticationMiddleware, CartItemController.editCartItemById);

export default router;
