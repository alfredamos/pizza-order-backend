import { Request, Response } from "express";
import { ChangePasswordModel } from "../models/changePassword.model";
import { authDb, AuthDb } from "../db/auth.db";
import { StatusCodes } from "http-status-codes";
import { EditProfileModel } from "../models/editProfile.model";
import { LoginModel } from "../models/login.model";
import { SignupModel } from "../models/signup.model";
import { AuthUserModel } from "../models/authUser.model";
import { UserInfoModel } from "../models/userInfo.model";
import { UserRoleChangeModel } from "../models/userRoleChange.model";
import { UserPayload } from "../models/userPayload.model";

export class AuthController {
  static changePassword = async (req: Request, res: Response) => {
    //----> Get the payload.
    const changePasswordPayload = req.body as ChangePasswordModel;

    //----> Change the password and store the updated user credentials in the database.
    const userDetail = await authDb.changePassword(changePasswordPayload);

    //----> Send back the response.
    res.status(StatusCodes.OK).json(userDetail);
  };

  static deleteAllUserAddressesByUserId = async (
    req: Request,
    res: Response
  ) => {
    //----> Get the userId from the request params.
    const { userId } = req.params;

    //----> Delete the user and all the addresses.
    await authDb.deleteAllUserAddressesByUserId(userId);
    //----> Send back the response.
    res.status(StatusCodes.OK).json({ message: "user successfully deleted!" });
  };

  static deleteOneAddressByUserId = async (req: Request, res: Response) => {
    const { addressId, userId } = req.params;
    //----> delete one address from database.
    const userWithOneAddressDeleted = await authDb.deleteOneAddressByUserId(
      addressId,
      userId
    );
    //----> Send back the response.
    res.status(StatusCodes.OK).json(userWithOneAddressDeleted);
  };

  static editAllAddressesByUserId = async (req: Request, res: Response) => {
    const { userId } = req.params; //----> Get the user id from params.
    const userPayload = req.body as UserPayload; //----> Get the user payload

    //----> edit all addresses by user id
    const {editedUser, updatedAddresses} = await authDb.editAllAddressesByUserId(userId, userPayload)
    
    //----> Send back the response.
    res
      .status(StatusCodes.OK)
      .json({ ...editedUser, address: updatedAddresses });
  };

  static editOneAddressByUserId = async (req: Request, res: Response) => {
    //----> Retrieve the addressId and userId from request params.
    const { addressId, userId } = req.params;
    const userPayload = req.body as UserPayload;

    //----> Edit one address by userId and addressId.
    const editedUser = await authDb.editOneAddressByUserId(addressId, userId, userPayload)
   
    //----> Send back the response.
    res.status(StatusCodes.OK).json(editedUser);
  };

  static editProfile = async (req: Request, res: Response) => {
    //----> Get the edit user payload.
    const editProfilePayload = req.body as EditProfileModel;

    //----> edit user profile and store it in the database.
    const editedUserDetail = await authDb.editProfile(editProfilePayload);

    //----> Send back the response.
    res.status(StatusCodes.OK).json(editedUserDetail);
  };

  static login = async (req: Request, res: Response) => {
    //----> Get the user credentials from the request.
    const loginCredentials = req.body as LoginModel;

    //----> Login the user and get json web token.
    const userCredentials = await authDb.login(loginCredentials);

    //----> Send back the response.
    res.status(StatusCodes.OK).json(userCredentials);
  };

  static signup = async (req: Request, res: Response) => {
    //----> Get the user credentials from the request.
    const newUserCredentials = req.body as SignupModel;

    //----> Store the new user credentials in the database.
    const userCredentials = await authDb.signup(newUserCredentials);

    //----> Send back the response.
    res.status(StatusCodes.OK).json(userCredentials);
  };

  static signupWithMultipleAddress = async (req: Request, res: Response) => {
    //----> Get the user credentials
    const userPayload = req.body as UserPayload;

    //----> Store the new user credentials in the database.
    const userCredentials = await authDb.signupWithMultipleAddresses(
      userPayload
    );

    //----> Send back the response.
    res.status(StatusCodes.OK).json(userCredentials);
  };

  static currentUser = async (req: Request, res: Response) => {
    //----> Retreat the user jsonwebtoken payload.
    const user = req["user"] as AuthUserModel;

    //----> Get user id from jsonwebtoken payload.
    const { id } = user;

    //----> Get the current user from the database.
    const userCurrent = await authDb.currentUser(id);

    //----> Send back the response.
    res.status(StatusCodes.OK).json(userCurrent);
  };

  static updateUserRole = async (req: Request, res: Response) => {
    //----> Get user credentials.
    const userInfo = req["user"] as UserInfoModel;

    //----> Get the email and user details of person to be made admin.
    const { email, role } = req.body as UserRoleChangeModel;

    //----> Change the user role and store the new credentials in the database.
    const userCredentials = await authDb.updateUserRole(userInfo, email, role);

    //----> Send back the response.
    res.status(StatusCodes.OK).json(userCredentials);
  };
}
