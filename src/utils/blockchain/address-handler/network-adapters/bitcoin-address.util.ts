import * as bitcoin from 'bitcoinjs-lib';
import { BIP32Factory, BIP32API } from 'bip32';
import * as ecc from 'tiny-secp256k1';
import { AddressHandler } from '../AddressHandler';
import { CreateCoinAddressException } from '@/exceptions/blockchain.exception';

export class BitcoinAddressHandler extends AddressHandler {
  private bip32: BIP32API;
  private network: bitcoin.networks.Network;

  constructor(xpub: string) {
    super(xpub);
    this.bip32 = BIP32Factory(ecc);
    this.network =
      process.env.NODE_ENV === 'development' ? bitcoin.networks.regtest : bitcoin.networks.bitcoin;
  }

  getAddress(page: number, account: number, index: number): string {
    const node = this.bip32.fromBase58(this.xpub, this.network);

    const child = node.derive(index);

    const { address } = bitcoin.payments.p2wpkh({
      pubkey: Buffer.from(child.publicKey),
      network: bitcoin.networks.bitcoin,
    });

    if (!address) {
      throw new CreateCoinAddressException({
        page,
        network: 'bitcoin',
        coin: 'bitcoin',
        account,
        index,
      });
    }

    return address;
  }
}
