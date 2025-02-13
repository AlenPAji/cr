// src/middleware/role.guard.ts
import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware';

export const roleGuard = (allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ 
        message: 'User not authenticated' 
      });
    }

    const userRole = req.user.role;
    const hasRole = allowedRoles.includes(
      Array.isArray(userRole) ? userRole[0] : userRole
    );

    if (!hasRole) {
      return res.status(403).json({ 
        message: 'Access forbidden - Insufficient permissions' 
      });
    }

    next();
  };
};