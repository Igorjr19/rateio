import { Module } from '@nestjs/common';
import { FirebaseService } from 'src/modules/firebase/firebase.service';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Module({
  providers: [PrismaService, FirebaseService],
  exports: [PrismaService, FirebaseService],
})
export class CommonModule {}
