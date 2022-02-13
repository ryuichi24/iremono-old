import crypto from 'crypto';
import { CryptoService } from '../../services/crypto-service';

export const constructCryptoService = (): CryptoService => {
  const generateInitializeVector = () => {
    return crypto.randomBytes(16).toString('hex');
  };

  const encryptInCBC = (data: crypto.BinaryLike, cipherKey: string, initializeVector: string) => {
    const key = crypto.createHash('sha256').update(cipherKey).digest();
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), Buffer.from(initializeVector, 'hex'));
    const encrypted = cipher.update(data);
    return Buffer.concat([encrypted, cipher.final()]).toString('hex');
  };

  const decryptInCBC = (encryptedData: string, cipherKey: string, initializeVector: string) => {
    const key = crypto.createHash('sha256').update(cipherKey).digest();
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), Buffer.from(initializeVector, 'hex'));
    const encryptedDataInBuffer = Buffer.from(encryptedData, 'hex');
    const decrypted = decipher.update(encryptedDataInBuffer);
    return Buffer.concat([decrypted, decipher.final()]).toString();
  };

  const generateCipherStreamInCBC = (cipherKey: string, initializeVector: string) => {
    const key = crypto.createHash('sha256').update(cipherKey).digest();
    return crypto.createCipheriv('aes-256-cbc', Buffer.from(key), Buffer.from(initializeVector, 'hex'));
  };

  const generateDecipherStreamInCBC = (cipherKey: string, initializeVector: string) => {
    const key = crypto.createHash('sha256').update(cipherKey).digest();
    return crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), Buffer.from(initializeVector, 'hex'));
  };

  return {
    generateInitializeVector,
    encryptInCBC,
    decryptInCBC,
    generateCipherStreamInCBC,
    generateDecipherStreamInCBC,
  };
};
