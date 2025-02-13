import { CreateUserDto } from '../dtos/user.dto';
import { UserModel } from '../models/user.model';
import { IUser } from '../models/interfaces/user.interface';
const bcrypt = require('bcrypt');
export class UserService {
  async createUser(userData: CreateUserDto): Promise<IUser> {
    try {
      // Perform any business logic (e.g., hash password)
      if (userData.password) {
        userData.password = await bcrypt.hash(userData.password, 10);
      }
      //console.log("usrdata",userData)

      // Create user in database using model
      const user = new UserModel(userData);
      return await user.save();
    } catch (error) {
      throw new Error('Error creating user');
    }
  }
}