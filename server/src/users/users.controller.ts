/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, ConflictException, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma, User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAllUsers() {
    return await this.usersService.findAllUsers();
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.findFirst(createUserDto);
    if (user) throw new ConflictException('The user is already exists!');
    const newUser = await this.usersService.createUser(createUserDto);
    return newUser;
  }
}
