import bcryptjs from 'bcryptjs';
import { HashService } from '../../services';

export const constructBcryptService = (): HashService =>
  Object.freeze({
    hash: async (value: string) => {
      const hashedText = await bcryptjs.hash(value, await bcryptjs.genSalt());
      return hashedText;
    },
    compare: async (plainText: string, hashedText: string) => {
      const isSame = bcryptjs.compare(plainText, hashedText);
      return isSame;
    },
  });
