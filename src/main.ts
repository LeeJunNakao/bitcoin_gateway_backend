import * as bitcoin from 'bitcoinjs-lib';

const network = bitcoin.networks.regtest; // ou mainnet/testnet
const psbt = new bitcoin.Psbt({ network });

psbt.addInput({
  hash: 'a754c854900078bd9255c017a60b6021827a0ea50e10b96b3687f78c37a576d1', // TXID (reverso)
  index: 1, // vout
  witnessUtxo: {
    script: Buffer.from('001474f8994a98015f2a29d16377c16a09b66ee9f172', 'hex'), // scriptPubKey do UTXO
    value: 1_000_000_000, // satoshi value
  },
});

psbt.addOutput({
  address: 'bcrt1qkqkcpuxxpp62z6xqt2aeevd4aqs02jc7m98mcy', // destino
  value: 1e8, // valor menos taxa
});

psbt.addOutput({
  address: 'bcrt1qwnufjj5cq90j52w3vdmuz6sfkehwnutj0x8pg2', // seu endereço de troco
  value: 1_000_000_000 - 1e8 - 30000, // 1_000_000_000 - 100_000_000 - 1_000 (fee)
});

const base64PSBT = psbt.toBase64();
console.log('PSBT base64:', base64PSBT);
