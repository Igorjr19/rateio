import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SessionDto } from './dto/session.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Public()
  @ApiOkResponse({
    type: SessionDto,
  })
  async login(@Body() loginDto: LoginDto): Promise<SessionDto> {
    return await this.authService.login(loginDto.email, loginDto.password);
  }
}
