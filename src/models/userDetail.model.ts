import { Gender} from '@prisma/client';

export class UserDetailModel{
    id: string;
    name: string;
    email: string;
    phone: string;
    gender: Gender;
}