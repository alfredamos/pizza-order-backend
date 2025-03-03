import { cookieAdminMiddleware } from '../middleware/cookieAdmin.middleware';
import { cookieAuthenticationMiddleware } from '../middleware/cookieAuthentication.middleware';
import { idCheckValidationMiddleware } from '../middleware/idCheckValidation.middleware';
import { orderValidationMiddleware } from '../middleware/orderValidation.middleware';
import { OrderController } from './../controllers/order.controller';
import { Router } from "express";


const router = Router();

router.param("id", idCheckValidationMiddleware);

router
  .route("/")
  .get(
    cookieAuthenticationMiddleware,
    cookieAdminMiddleware,
   OrderController.getAllOrders
  )
  .post(
    cookieAuthenticationMiddleware,
    orderValidationMiddleware,
   OrderController.createOrder
  );

router
  .route("/:id")
  .delete(cookieAuthenticationMiddleware,OrderController.deleteOrderById)
  .get(cookieAuthenticationMiddleware,OrderController.getOrderById)
  .patch(
    cookieAuthenticationMiddleware,
    cookieAdminMiddleware,
    orderValidationMiddleware,
   OrderController.editOrderById
  );

router
  .route("/orders-by-user-id/:userId")
  .get(cookieAuthenticationMiddleware,OrderController.getAllOrdersByUserId);

router
  .route("/shipped/:orderId")
  .patch(
    cookieAuthenticationMiddleware,
    cookieAdminMiddleware,
   OrderController.orderShipped
  );

router
  .route("/delivered/:orderId")
  .patch(
    cookieAuthenticationMiddleware,
    cookieAdminMiddleware,
   OrderController.orderDelivered
  );


router
  .route("/delete-all-orders-by-user-id/:userId")
  .delete(cookieAuthenticationMiddleware,OrderController.deleteOrdersByUserId);

export default router;
