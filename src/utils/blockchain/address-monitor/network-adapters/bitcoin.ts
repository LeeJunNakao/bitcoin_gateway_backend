import axios from 'axios';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const rpcCall = async (method: string, params: any[] = []) => {
  const env = process.env.NODE_ENV;
  const rpcUrl =
    env === 'development' ? 'http://bitcoin-regtest:18443' : (process.env.BTC_RPC_URL as string);

  const response = await axios.post(
    rpcUrl,
    {
      jsonrpc: '1.0',
      id: 'btcpayment',
      method,
      params,
    },
    {
      auth: {
        username: process.env.BTC_RPC_USER as string,
        password: process.env.BTC_RPC_PASSWORD as string,
      },
    },
  );

  return response.data.result;
};

export class BitcoinMonitorHandler {
  private async getUtxosForAddress(address: string) {
    const utxos = await rpcCall('scantxoutset', [
      'start',
      [{ desc: `addr(${address})`, range: 999999 }],
    ]);

    return utxos;
  }

  async monitorAddress(address: string, expectedAmountSats: number) {
    console.log(`Monitorando endereço: ${address}`);

    while (true) {
      try {
        const utxoSet = await this.getUtxosForAddress(address);

        if (!utxoSet || !utxoSet.total_amount) {
          console.log('Nenhum saldo no endereço ainda.');
        } else {
          const receivedSats = utxoSet.total_amount * 1e8;
          console.log(`Recebido: ${receivedSats} sats`);

          if (receivedSats >= expectedAmountSats) {
            console.log('✅ Pagamento detectado!');
            break;
          }
        }
      } catch (err) {
        console.error('Erro na consulta:', err);
      }

      await sleep(10000); // aguarda 30 segundos
    }
  }
}
