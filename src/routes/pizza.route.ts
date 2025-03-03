import express from "express";
import { idCheckValidationMiddleware } from "../middleware/idCheckValidation.middleware";
import { PizzaController } from "../controllers/pizza.controller";
import { pizzaValidationMiddleware } from "../middleware/pizzaValidation.middleware";
import { cookieAuthenticationMiddleware } from "../middleware/cookieAuthentication.middleware";
import { cookieAdminMiddleware } from "../middleware/cookieAdmin.middleware";

const router = express.Router();

router.param("id", idCheckValidationMiddleware);

router
  .route("/")
  .get(PizzaController.getAllPizzas)
  .post(pizzaValidationMiddleware, cookieAuthenticationMiddleware, cookieAdminMiddleware, PizzaController.createPizza);

router
  .route("/:id")
  .delete(cookieAuthenticationMiddleware, cookieAdminMiddleware, PizzaController.deletePizzaById)
  .get(PizzaController.getPizzaById)
  .patch(pizzaValidationMiddleware, cookieAuthenticationMiddleware, cookieAdminMiddleware, PizzaController.editPizzaById);

export default router;
