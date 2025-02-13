import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model';
import { ValidatedUser } from '../models/interfaces/user.interface';
import { MailService } from './mail.service';
import { Types } from 'mongoose';
import config from '../config/env.config';
const bcrypt=require('bcrypt')  // Use import instead of require

export class AuthService {
  constructor(private mailService: MailService) {}

  async validateUser(email: string, password: string): Promise<ValidatedUser> {
    const user = await UserModel.findOne({ email });
    
    
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    if (!user?.isActive) {
      throw new Error('Inactive User');
    }
    return {
      _id: user._id,
      email: user.email,
      roles: user.roles
    };
  }

  async generateTokens(user: ValidatedUser) {
    const payload = {
      sub: user._id,
      email: user.email,
      role: user.roles  // Use user.role instead of hardcoding "admin"
    };

    // Make sure JWT_SECRET exists
    if (!config.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    // Make sure REFRESH_TOKEN_SECRET exists
    if (!process.env.REFRESH_TOKEN_SECRET) {
      throw new Error('REFRESH_TOKEN_SECRET is not defined in environment variables');
    }

    const accessToken = jwt.sign(
      payload,
      config.JWT_SECRET,
      { expiresIn: '1d' }
    );

    const refreshToken = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' }
    );

    return { accessToken, refreshToken };
  }

  async validateRefreshToken(token: string): Promise<ValidatedUser> {
    if (!process.env.REFRESH_TOKEN_SECRET) {
      throw new Error('REFRESH_TOKEN_SECRET is not defined in environment variables');
    }

    try {
      const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET) as {
        sub: string;
        email: string;
        role: string;
      };

      return {
        _id: new Types.ObjectId(decoded.sub),
        email: decoded.email,
        roles: decoded.role
      };
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }
}