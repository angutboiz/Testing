/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
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
    async createUser(@Body() userData: { email: string, password: string },
    ): Promise<User> {
        return this.UsersService.createUser(userData)
    }

}