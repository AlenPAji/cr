import mongoose, { Schema, model } from 'mongoose';
import { IUser } from './interfaces/user.interface';

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    roles: {
        type: String,
        required: true,
        enum: ["admin", "employee"],
    },
    isActive: { 
      type: Boolean,
      default: true // Default to active
    },
    
    
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, ret) => {
        delete ret.password;
        return ret;
      }
    }
  }
);

export const UserModel = model<IUser>('User', userSchema);