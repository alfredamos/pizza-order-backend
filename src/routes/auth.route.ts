import express from "express";
import { changePasswordValidationMiddleware } from "../middleware/changePasswordValidation.middleware";
import { authenticationMiddleware } from "../middleware/authentication.middleware";
import { AuthController } from "../controllers/auth.controller";
import { editProfileValidationMiddleware } from "../middleware/editProfileValidation.middleware";
import { loginValidationMiddleware } from "../middleware/loginValidation.middleware";
import { authorizationMiddleware } from "../middleware/authorization.middleware";
import { signupValidationMiddleware } from "../middleware/signupValidation.middleware";
import { roleUserValidationMiddleware } from "../middleware/roleUserValidation.middleware";
import { userValidationMiddleware } from "../middleware/userValidation.middleware";

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

router
  .route("/signup-with-many-addresses")
  .post(signupValidationMiddleware, AuthController.signupWithMultipleAddress);


//orderId/delete/cart-items/cartItemId
router
  .route("/:userId/delete-one/addresses/:addressId")
  .delete(
    authenticationMiddleware,
    authorizationMiddleware("Admin"),
   AuthController.deleteOneAddressByUserId
  );

 //userId/update-all/addresses

router
  .route("/:userId/update-all/addresses")
  .patch(
    authenticationMiddleware,
    authorizationMiddleware("Admin"),
    userValidationMiddleware,
   AuthController.editAllAddressesByUserId
  );
 
 //userId/update/addresses/addressId

router
  .route("/:userId/update-one/addresses/:addressId")
  .patch(
    authenticationMiddleware,
    authorizationMiddleware("Admin"),
    userValidationMiddleware,
   AuthController.editOneAddressByUserId
  ); 


  //----> delete All User Addresses By UserId

router
  .route("/delete-all-addresses-by-user-id/:userId")
  .delete(authenticationMiddleware,AuthController.deleteAllUserAddressesByUserId);

export default router;
