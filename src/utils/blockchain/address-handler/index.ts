import { BlockchainNetwork } from '@/types/entities/blockchain';
import { BitcoinAddressHandler } from './network-adapters/bitcoin-address.util';

export const getAddressHandler = (network: BlockchainNetwork) => {
  const options = {
    [BlockchainNetwork.BITCOIN]: BitcoinAddressHandler,
  };

  return options[network];
};
