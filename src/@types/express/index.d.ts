import 'express-serve-static-core';

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
