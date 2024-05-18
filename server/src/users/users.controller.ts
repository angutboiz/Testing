import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { CurrentUser } from './user.decorator';
import { User } from '@prisma/client';
import { UserActive } from './guards/user-active.guard';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, UserActive)
  @Delete()
  async deActiveUser(@CurrentUser() user: User) {
    return await this.usersService.deleteUser(user.id);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.usersService.createUser(createUserDto);
    return newUser;
  }

  @UseGuards(JwtAuthGuard, UserActive)
  @Get()
  async getCurrentUser(@CurrentUser() user: User) {
    return await this.usersService.getCurrentUser(user);
  }
}
