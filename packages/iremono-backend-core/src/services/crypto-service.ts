import crypto from 'crypto';

export interface CryptoService {
  generateInitializeVector: () => string;
  encryptInCBC: (data: crypto.BinaryLike, cipherKey: string, initializeVector: string) => string;
  decryptInCBC: (encryptedData: string, cipherKey: string, initializeVector: string) => string;
  generateCipherStreamInCBC: (cipherKey: string, initializeVector: string) => crypto.Cipher;
  generateDecipherStreamInCBC: (cipherKey: string, initializeVector: string) => crypto.Decipher;
}
