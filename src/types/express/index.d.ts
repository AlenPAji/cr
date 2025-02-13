// src/types/express/index.d.ts
declare namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string | string[];
      }
    }
  }