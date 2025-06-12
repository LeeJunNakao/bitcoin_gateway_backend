export abstract class AddressHandler {
  constructor(protected xpub: string) {}

  abstract getAddress(getAddress: number, account: number, index: number): string;
}
