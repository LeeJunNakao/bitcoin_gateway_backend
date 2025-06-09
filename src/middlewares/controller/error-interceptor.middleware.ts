import express, { Request, Response, NextFunction } from 'express';

export const errorInterceptor = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: 'Something went wrong.',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
};
