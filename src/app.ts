import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { connectDatabase } from '@config/index';
import setRoutes from '@/controllers';
import { errorInterceptor } from './middlewares/controller/error-interceptor.middleware';

export const setupApp = async () => {
  const app = express();

  app.use(
    cors({
      origin: 'http://localhost:5173',
      allowedHeaders: ['Content-Type', 'Authorization', 'Access-Token'],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    }),
  );

  const sequelize = await connectDatabase();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  setRoutes(app);

  app.use(errorInterceptor);

  return { app, sequelize };
};
