import bitcoin from 'bitcoinjs-lib';
import { BIP32Factory, BIP32API } from 'bip32';
import ecc from 'tiny-secp256k1';
import { AddressHandler } from '../address-handler';
import { CreateCoinAddressException } from '@/exceptions/blockchain.exception';

export class BitcoinAddressHandler extends AddressHandler {
  private bip32: BIP32API;

  constructor(xpub: string) {
    super(xpub);
    this.bip32 = BIP32Factory(ecc);
  }

  getAddress(page: number, account: number, index: number): string {
    const node = this.bip32.fromBase58(this.xpub, bitcoin.networks.bitcoin);

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
