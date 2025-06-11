import { z } from 'zod';
import { OautherClient } from '@oauther/oauther_client';
import { LoginValidator } from '@/types/validators/auth';

export class AuthService {
  constructor(private oautherClient: OautherClient) {}

  async login(loginDto: z.infer<typeof LoginValidator>) {
    const response = await this.oautherClient.login(loginDto);

    return response;
  }
}
