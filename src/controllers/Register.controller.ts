import { OautherClient, RegisterParams } from '@oauther/oauther_client';

export class RegisterController {
  constructor(private oautherClient: OautherClient) {}

  async register(dto: RegisterParams) {
    const registerResponse = await this.oautherClient.register(dto);
  }
}
