import { Module } from '@nestjs/common';
import { FirebaseService } from 'src/modules/firebase/firebase.service';

import { CryptoService } from '../crypto/crypto.service';

@Module({
  providers: [FirebaseService, CryptoService],
  exports: [FirebaseService, CryptoService],
})
export class CommonModule {}
