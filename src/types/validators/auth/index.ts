import { CustomerType } from '@/models/Customer.orm';
import { z } from 'zod';

export const LoginValidator = z
  .object({
    email: z.string().min(3).max(100),
    password: z.string().min(6).max(50),
  })
  .strict();

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
      password: z.string().min(8).max(50),
    }),
  })
  .strict();
