import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
  scrypt,
} from 'crypto';
import authConfig, { AuthConfig } from 'src/config/auth.config';
import { promisify } from 'util';

@Injectable()
export class CryptoService {
  private readonly password: string;
  private readonly encryptionAlgorithm = 'aes-256-ctr';
  private readonly saltRounds = 10;
  private readonly ivSize = 16;
  private readonly keyLength = 32;

  constructor(
    @Inject(authConfig.KEY)
    private readonly authConfig: AuthConfig,
  ) {
    this.password = this.authConfig.cryptoKey;
  }

  hash(plain: string, saltRounds = this.saltRounds): Promise<string> {
    return bcrypt.hash(plain, saltRounds);
  }

  deterministicHash(plain: string): string {
    return createHash('sha256')
      .update(plain + this.password)
      .digest('hex');
  }

  compare(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }

  async encrypt(
    plain: string,
    iv: Buffer = randomBytes(this.ivSize),
  ): Promise<string> {
    const ivString = iv.toString('hex');

    const key = (await promisify(scrypt)(
      this.password,
      'salt',
      this.keyLength,
    )) as Buffer;

    const cipher = createCipheriv(this.encryptionAlgorithm, key, iv);

    const encryptedText = Buffer.concat([
      cipher.update(plain, 'utf8'),
      cipher.final(),
    ]);

    return `${ivString}${encryptedText.toString('hex')}`;
  }

  async decrypt(encrypted: string): Promise<string> {
    const iv = Buffer.from(encrypted.slice(0, this.keyLength), 'hex');
    encrypted = encrypted.slice(this.keyLength);

    const key = (await promisify(scrypt)(
      this.password,
      'salt',
      this.keyLength,
    )) as Buffer;

    const decipher = createDecipheriv(
      this.encryptionAlgorithm,
      key as any,
      iv as any,
    );

    const encryptedBuffer = Buffer.from(encrypted, 'hex');
    const decryptedText = Buffer.concat([
      decipher.update(encryptedBuffer as any),
      decipher.final() as any,
    ]);

    return decryptedText.toString();
  }
}
