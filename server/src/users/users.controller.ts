/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, ConflictException, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma, User } from '@prisma/client';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAllUsers() {
    return await this.usersService.findAllUsers();
  }

  @Post()
  async createUser(
    @Body() userData: { email: string; password: string },
  ): Promise<User> {
    const user = await this.usersService.findUser({ email: userData.email });
    if (user) {
      throw new ConflictException('User already exists!');
    }
    return await this.usersService.createUser(userData);
  }
}
