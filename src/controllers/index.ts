import { Express } from 'express';
import { mountRoute } from './Register.controller';

const setRoutes = (app: Express) => {
  app.use('/register', mountRoute());
};

export default setRoutes;
