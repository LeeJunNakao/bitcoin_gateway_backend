import { BlockchainNetwork } from '@/types/entities/blockchain';
import axios, { AxiosInstance } from 'axios';

export class CryptoMsService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.BACKEND_SUPPORT_SERVER_URL,
      headers: {
        'Access-Token': process.env.BACKEND_SUPPORT_K,
      },
    });
  }

  async createPubkey(account: number, network: BlockchainNetwork) {
    const response = await this.client.post(`/wallet/xpub`, { account, network });

    const { xpub } = response.data;

    return xpub;
  }
}
