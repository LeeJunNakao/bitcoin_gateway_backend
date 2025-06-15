abstract class MonitorHandler {
  abstract monitorPayment(address: string, expectedValue: number): Promise<void>;
}
