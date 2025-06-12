import { z } from 'zod';

export const CreateConfigAPIKeyValidator = z
  .object({
    name: z.string(),
  })
  .strict();
