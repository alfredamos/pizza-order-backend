import { UserResponseModel } from './userResponse.model';

export class AuthResponseModel { 
  user: UserResponseModel;
  signIn?: UserResponseModel;
  token: string;
  isLoggedIn: boolean;
  isAdmin?: boolean
}