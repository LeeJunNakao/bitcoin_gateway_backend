import { OautherClient } from '@oauther/oauther_client';

export const oautherClient = new OautherClient({
  baseURL: process.env.OAUTHER_URL,
  systemName: process.env.OAUTHER_SYSTEM,
  authClient: process.env.OAUTHER_CLIENT,
  apiKey: process.env.OAUTHER_API_KEY,
});
