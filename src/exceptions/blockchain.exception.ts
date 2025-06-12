export class CreateCoinAddressException extends Error {
  constructor(data: {
    network: string;
    coin: string;
    account: number;
    page: number;
    index: number;
  }) {
    super(
      `Failed to create cryptocoin address. ${data.network} - ${data.coin} - ${data.page} / ${data.account}/${data.index}`,
    );
  }
}

export class CustomerConfigException extends Error {
  constructor() {
    super('Customer config does not exist');
  }
}
