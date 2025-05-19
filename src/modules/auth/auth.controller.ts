import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';

import { UserIn } from '../user/dto/user.dto';
import { AuthService } from './auth.service';
import { Login } from './dto/login.dto';
import { Session } from './dto/session.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Public()
  @ApiOkResponse({
    type: Session,
  })
  async login(@Body() loginDto: Login): Promise<Session> {
    return await this.authService.login(loginDto.email, loginDto.password);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @Public()
  @ApiCreatedResponse({
    type: Session,
  })
  async signUp(@Body() userIn: UserIn): Promise<Session> {
    return await this.authService.signUp(userIn);
  }
}
