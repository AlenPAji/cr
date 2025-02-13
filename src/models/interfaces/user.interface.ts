import { Types } from 'mongoose';
export interface IUser {
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    roles:"admin"|"Employee",
    isActive: boolean;
}


export interface ValidatedUser {
  _id: Types.ObjectId;
  email: string;
  
  roles:string
}