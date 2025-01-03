import express from "express";
import { idCheckValidationMiddleware } from "../middleware/idCheckValidation.middleware";
import { PizzaController } from "../controllers/pizza.controller";
import { authenticationMiddleware } from '../middleware/authentication.middleware';
import { authorizationMiddleware } from '../middleware/authorization.middleware';
import { pizzaValidationMiddleware } from "../middleware/pizzaValidation.middleware";

const router = express.Router();

router.param("id", idCheckValidationMiddleware);

router
  .route("/")
  .get(PizzaController.getAllPizzas)
  .post(pizzaValidationMiddleware, authenticationMiddleware, authorizationMiddleware('Admin'), PizzaController.createPizza);

router
  .route("/:id")
  .delete(authenticationMiddleware, authorizationMiddleware('Admin'), PizzaController.deletePizzaById)
  .get(PizzaController.getPizzaById)
  .patch(pizzaValidationMiddleware, authenticationMiddleware, authorizationMiddleware('Admin'), PizzaController.editPizzaById);

export default router;
