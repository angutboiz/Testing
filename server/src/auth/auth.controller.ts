import {
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guards';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guards';
import {SkipThrottle, ThrottlerGuard} from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(ThrottlerGuard,LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  async login(@Req() req: any, @Res({ passthrough: true }) response: Response) {
    return await this.authService.login(req.user, response);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(200)
  logout(@Req() req: any, @Res({ passthrough: true }) res: Response) {
    return this.authService.logout(req, res);
  }
}
