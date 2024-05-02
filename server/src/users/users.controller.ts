/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './signUp-user.dto';
@Controller('users')
export class UsersController {
    constructor(
        private readonly UsersService: UsersService,
    ) { }

    @Get()
    async findAllUsers() {
        return this.UsersService.findAllUsers()
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto,
    ): Promise<User> {
        return this.UsersService.createUser(createUserDto)
    }

}