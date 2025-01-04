import express from "express";
import { changePasswordValidationMiddleware } from "../middleware/changePasswordValidation.middleware";
import { authenticationMiddleware } from "../middleware/authentication.middleware";
import { AuthController } from "../controllers/auth.controller";
import { editProfileValidationMiddleware } from "../middleware/editProfileValidation.middleware";
import { loginValidationMiddleware } from "../middleware/loginValidation.middleware";
import { authorizationMiddleware } from "../middleware/authorization.middleware";
import { signupValidationMiddleware } from "../middleware/signupValidation.middleware";
import { roleUserValidationMiddleware } from "../middleware/roleUserValidation.middleware";

const router = express.Router();

router
  .route("/change-password")
  .patch(
    changePasswordValidationMiddleware,
    authenticationMiddleware,
    AuthController.changePassword
  );

router
  .route("/edit-profile")
  .patch(
    editProfileValidationMiddleware,
    authenticationMiddleware,
    AuthController.editProfile
  );

router
  .route("/current-user")
  .get(authenticationMiddleware, AuthController.currentUser);

router.route("/login").post(loginValidationMiddleware, AuthController.login);

router
  .route("/change-role")
  .patch(
    roleUserValidationMiddleware,
    authenticationMiddleware,
    authorizationMiddleware("Admin"),
    AuthController.updateUserRole
  );

router
  .route("/signup")
  .post(signupValidationMiddleware, AuthController.signup);

 
export default router;
