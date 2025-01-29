import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class Session {
  @ApiProperty()
  @Expose()
  @IsString()
  token: string;

  @ApiProperty()
  @Expose()
  @IsNumber()
  expiresIn: number;

  constructor(params: Partial<Session>) {
    Object.assign(this, params);
  }
}
