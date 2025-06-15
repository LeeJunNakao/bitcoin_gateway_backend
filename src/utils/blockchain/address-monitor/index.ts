import { BlockchainNetwork } from '@/types/entities/blockchain';
import { BitcoinMonitorHandler } from './network-adapters/bitcoin';

export const getMonitorHandler = (network: BlockchainNetwork) => {
  const options = {
    [BlockchainNetwork.BITCOIN]: BitcoinMonitorHandler,
  };

  return options[network];
};
