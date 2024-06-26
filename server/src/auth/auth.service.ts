import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, pass: string) {
    // Find user by email or username
    const user = await this.usersService.findUser({ email: email });
    if (!user) throw new BadRequestException('Invalid credentials');

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) throw new BadRequestException('Invalid credentials');

    const { password, ...result } = user;
    return result;
  }

  async login(user: Prisma.UserWhereUniqueInput, response: Response) {
    const payload = {
      email: user.email,
      sub: user.id,
      onboarding: user.onboarding,
    };
    const access_token = await this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET
    });

    const expires = new Date(new Date().getTime() + 60 * 60 * 1000); // 3600 seconds × 1000 milliseconds
    response.cookie('Authentication', access_token, {
      expires: expires,
      httpOnly: true,
      secure: process.env.NODE_ENV === "PRODUCTION",
      sameSite: process.env.NODE_ENV === "PRODUCTION" ? 'none' : 'lax',
    });

    return user;
  }

  logout(request: Request, response: Response) {
    response.clearCookie('Authentication', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'PRODUCTION',
      sameSite: process.env.NODE_ENV === 'PRODUCTION' ? 'none' : 'lax',
      expires: new Date(0),
    });
    return { message: 'Logout successful' };
  }
}
