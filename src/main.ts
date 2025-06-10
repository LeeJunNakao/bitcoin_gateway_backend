import dotenv from 'dotenv';

dotenv.config();

import { setupApp } from './app';

const startApp = async () => {
  const { app } = await setupApp();

  const PORT = process.env.PORT;

  app.listen(PORT, () => console.log(`Server running in port: ${PORT}`));
};

startApp();
