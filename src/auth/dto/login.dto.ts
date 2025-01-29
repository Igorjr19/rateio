import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class Login {
  @ApiProperty()
  @Expose()
  @IsEmail()
  email: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsNotEmpty()
  password: string;
}
