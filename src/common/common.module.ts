import { Module } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [PrismaService, FirebaseService],
  exports: [PrismaService, FirebaseService],
})
export class CommomModule {}
