export interface HashService {
  hash(value: string): Promise<string>;
  compare(plainText: string, hashedText: string): Promise<boolean>;
}
