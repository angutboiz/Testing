/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './signUp-user.dto';
import { UpdateUserDto } from './update-user.dto';
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

    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.UsersService.updateUser(+id, updateUserDto)
    }

}