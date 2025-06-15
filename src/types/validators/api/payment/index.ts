import { BlockchainCoin, BlockchainNetwork } from '@/types/entities/blockchain';
import { z } from 'zod';

export const CreatePaymentRequestValidator = z
  .object({
    network: z.nativeEnum(BlockchainNetwork),
    coin: z.nativeEnum(BlockchainCoin),
    value: z.string(),
    description: z.string(),
  })
  .strict();
