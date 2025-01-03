import { Gender } from "@prisma/client";

export class SignupModel{
  name: string;
  email: string;
  phone: string;
  gender: Gender;
  confirmPassword: string;
  password: string;
}