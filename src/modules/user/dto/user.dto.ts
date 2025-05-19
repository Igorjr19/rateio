import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  Length,
  Matches,
  MaxDate,
} from 'class-validator';

const NicknameRegex = /^[a-zA-Z0-9_]+$/;
const NicknameLength = { min: 3, max: 20 };
const NicknameErrorMessage =
  'Nickname can only contain letters, numbers, and underscores';

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
  @Matches(NicknameRegex, {
    message: NicknameErrorMessage,
  })
  @Length(NicknameLength.min, NicknameLength.max)
  nickname: string;

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
