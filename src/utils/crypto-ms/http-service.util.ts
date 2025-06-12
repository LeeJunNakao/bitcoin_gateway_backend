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

  async signTransaction(
    hdPath: string,
    network: BlockchainNetwork,
    base64Transaction: string,
  ): Promise<{ transaction: string }> {
    const response = await this.client.post(`/transaction/sign`, {
      hdPath,
      network,
      transaction: base64Transaction,
    });

    return response.data;
  }
}
