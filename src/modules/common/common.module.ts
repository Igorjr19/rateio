import { Module } from '@nestjs/common';
import { FirebaseService } from 'src/modules/firebase/firebase.service';

@Module({
  providers: [FirebaseService],
  exports: [FirebaseService],
})
export class CommonModule {}
