import express from "express";
import { idCheckValidationMiddleware } from "../middleware/idCheckValidation.middleware";
import { UserController } from "../controllers/user.controller";
import { authenticationMiddleware } from '../middleware/authentication.middleware';
import { authorizationMiddleware } from '../middleware/authorization.middleware';

const router = express.Router();

router.param("id", idCheckValidationMiddleware);

router
  .route("/")
  .get(authenticationMiddleware, authorizationMiddleware('Admin'), UserController.getAllUsers)
  
router
  .route("/:id")
  .delete(
    authenticationMiddleware,
    authorizationMiddleware("Admin"),
    UserController.deleteUserById
  )
  .get(
    authenticationMiddleware,
    authorizationMiddleware("Admin"),
    UserController.getUserById
  );
 

export default router;
