import { BlockchainCoin, BlockchainNetwork } from '@/types/entities/blockchain';
import axios, { AxiosInstance } from 'axios';

type AddToQueueDTO = {
  requestUid: string;
  customerId: number;
  expectedValue: string;
  network: BlockchainNetwork;
  currency: BlockchainCoin;
  networkAddress: string;
};

export class PaymentProcessorMsService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.PAYMENT_PROCESSOR_URL,
      headers: {
        'Secret-Key': process.env.SECRET_ACCESS_KEY,
      },
    });
  }

  async addPaymentToQueue(dto: AddToQueueDTO) {
    const response = await this.client.post(`/queue`, dto);

    const { id } = response.data;

    return id;
  }
}
