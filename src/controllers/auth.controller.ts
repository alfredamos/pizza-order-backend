import { Request, Response } from "express";
import { ChangePasswordModel } from "../models/changePassword.model";
import { authDb } from "../db/auth.db";
import { StatusCodes } from "http-status-codes";
import { EditProfileModel } from "../models/editProfile.model";
import { LoginModel } from "../models/login.model";
import { SignupModel } from "../models/signup.model";
import { AuthUserModel } from "../models/authUser.model";
import { UserInfoModel } from "../models/userInfo.model";
import { UserRoleChangeModel } from "../models/userRoleChange.model";

export class AuthController {
  static changePassword = async (req: Request, res: Response) => {
    //----> Get the payload.
    const changePasswordPayload = req.body as ChangePasswordModel;

    //----> Change the password and store the updated user credentials in the database.
    const userDetail = await authDb.changePassword(changePasswordPayload);

    //----> Send back the response.
    res.status(StatusCodes.OK).json(userDetail);
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
