import { OautherClient } from '@oauther/oauther_client';

export const oautherClient = new OautherClient({
  baseURL: process.env.OAUTHER_URL as string,
  systemName: process.env.OAUTHER_SYSTEM as string,
  authClient: process.env.OAUTHER_CLIENT as string,
  apiKey: process.env.OAUTHER_API_KEY as string,
});
