import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  MaxDate,
} from 'class-validator';

export class UserIn {
  @ApiProperty()
  @Expose()
  @IsEmail()
  email: string;

  @ApiProperty()
  @Expose()
  @IsStrongPassword()
  password: string;

  @ApiProperty()
  @Expose()
  @IsString()
  name: string;

  @ApiProperty()
  @Expose()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @MaxDate(new Date(new Date().setFullYear(new Date().getFullYear() - 18)))
  birthdate: Date;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsPhoneNumber('BR')
  phone: string;
}
