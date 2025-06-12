import crypto from 'crypto';

export const generateRandomHash = (length = 64) => {
  return crypto.randomBytes(length).toString('hex');
};
