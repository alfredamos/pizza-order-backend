import { Gender } from "@prisma/client";

export class EditProfileModel{
  name: string;
  email: string;
  phone: string;
  gender: Gender;
  password: string;
}