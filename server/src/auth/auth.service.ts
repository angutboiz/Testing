import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findOne(email);
    if (!user) throw new BadRequestException('Invalid credentials');

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) throw new BadRequestException('Invalid credentials');

    const { password, ...result } = user;
    return result;
  }

  async login(user: any, response: Response) {
    const payload = { username: user.username, sub: user.userId };
    const access_token = await this.jwtService.sign(payload);
    response.cookie('Authentication', access_token, {
      expires: new Date(new Date().getTime() + 30 * 1000),
      httpOnly: true,
    });

    return user;
  }
}
