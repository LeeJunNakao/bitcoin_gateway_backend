// src/@types/express/index.d.ts
import { Request } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    internalData?: {
      user: {
        id: number;
        email: string;
      };
      customer?: {
        id: number;
      };
    };
  }
}
