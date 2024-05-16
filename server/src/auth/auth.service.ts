import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
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
    const access_token = await this.jwtService.sign(payload);

    const expires = new Date(new Date().getTime() + 3600 * 1000);
    response.cookie('Authentication', access_token, {
      expires: expires,
      httpOnly: true,
    });

    return user;
  }
}
