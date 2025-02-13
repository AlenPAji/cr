// src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/env.config';


// Define the user interface
interface User {
  id: string;
  email: string;
  role: string | string[];
}

// Extend the Request type
export interface AuthRequest extends Request {
  user?: User;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET!) as {
      sub: string;
      email: string;
      role: string;
    };

   // console.log(decoded)

    // Match the user property structure with the interface
    req.user = {
      id: decoded.sub,      // Changed from userId to id
      email: decoded.email,
      role: decoded.role
    };

    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};