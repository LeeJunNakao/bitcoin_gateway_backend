type PaymentAddressInfo = {
  address: string;
  hash: string;
};

interface INetworkAdapter {
  createPaymentAddress(): Promise<PaymentAddressInfo>;
}

class TransactionHandler {
  constructor(private networkAdapter: INetworkAdapter) {}

  createPaymentRequest() {}
}
