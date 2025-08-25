import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CryptoService } from 'src/modules/crypto/crypto.service';

@Injectable()
export class DecryptPipe implements PipeTransform {
  constructor(private readonly cryptoService: CryptoService) {}

  transform(value: any, metadata: ArgumentMetadata) {
    if (!value) {
      return null;
    }
    return this.cryptoService.decrypt(value);
  }
}
