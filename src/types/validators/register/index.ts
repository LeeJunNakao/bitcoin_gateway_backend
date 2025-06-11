import { CustomerType } from '@/models/Customer.orm';
import { z } from 'zod';

export const RegisterCustomerValidator = z
  .object({
    customer: z.object({
      name: z.string().min(3).max(100),
      email: z.string().email(),
      customerType: z.nativeEnum(CustomerType),
    }),
    user: z.object({
      name: z.string().min(3).max(100),
      email: z.string().email(),
      password: z.string().min(50),
    }),
  })
  .strict();
