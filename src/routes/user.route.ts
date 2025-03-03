import express from "express";
import { idCheckValidationMiddleware } from "../middleware/idCheckValidation.middleware";
import { UserController } from "../controllers/user.controller";
import { cookieAuthenticationMiddleware } from "../middleware/cookieAuthentication.middleware";
import { cookieAdminMiddleware } from "../middleware/cookieAdmin.middleware";

const router = express.Router();

router.param("id", idCheckValidationMiddleware);

router
  .route("/")
  .get(cookieAuthenticationMiddleware, cookieAdminMiddleware, UserController.getAllUsers)
  
router
  .route("/:id")
  .delete(
    cookieAuthenticationMiddleware,
    cookieAdminMiddleware,
    UserController.deleteUserById
  )
  .get(
    cookieAuthenticationMiddleware,
    cookieAdminMiddleware,
    UserController.getUserById
  );
 

export default router;
