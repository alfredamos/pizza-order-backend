import { authenticationMiddleware } from '../middleware/authentication.middleware';
import { authorizationMiddleware } from '../middleware/authorization.middleware';
import { idCheckValidationMiddleware } from '../middleware/idCheckValidation.middleware';
import { orderValidationMiddleware } from '../middleware/orderValidation.middleware';
import { OrderController } from './../controllers/order.controller';
import { Router } from "express";


const router = Router();

router.param("id", idCheckValidationMiddleware);

router
  .route("/")
  .get(
    authenticationMiddleware,
    authorizationMiddleware("Admin"),
   OrderController.getAllOrders
  )
  .post(
    authenticationMiddleware,
    orderValidationMiddleware,
   OrderController.createOrder
  );

router
  .route("/:id")
  .delete(authenticationMiddleware,OrderController.deleteOrderById)
  .get(authenticationMiddleware,OrderController.getOrderById)
  .patch(
    authenticationMiddleware,
    authorizationMiddleware("Admin"),
    orderValidationMiddleware,
   OrderController.editOrderById
  );

router
  .route("/orders-by-user-id/:userId")
  .get(authenticationMiddleware,OrderController.getAllOrdersByUserId);

router
  .route("/shipped/:orderId")
  .patch(
    authenticationMiddleware,
    authorizationMiddleware("Admin"),
   OrderController.orderShipped
  );

router
  .route("/delivered/:orderId")
  .patch(
    authenticationMiddleware,
    authorizationMiddleware("Admin"),
   OrderController.orderDelivered
  );


router
  .route("/delete-all-orders-by-user-id/:userId")
  .delete(authenticationMiddleware,OrderController.deleteOrdersByUserId);

export default router;
