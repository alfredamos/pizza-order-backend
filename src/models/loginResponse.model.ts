import { ResponseAuth } from "./CookieResponse";
import { UserResponseModel } from "./userResponse.model";

export class LoginResponse{
  authResponse: ResponseAuth;
  currentUser: UserResponseModel;
}