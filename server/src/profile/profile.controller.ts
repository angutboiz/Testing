import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Profile, User } from '@prisma/client';
import { CurrentUser } from 'src/users/user.decorator';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { Onboarding } from './guards/onboarding.guard';
import { CreateProfileDto } from './dto/createProfile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserProfile(@CurrentUser() user: User): Promise<Profile> {
    return await this.profileService.getUserProfile(user.id);
  }

  @UseGuards(JwtAuthGuard, Onboarding)
  @Post()
  async createUserProfile(
    @Body() createProfileDto: CreateProfileDto,
    @CurrentUser() user: User,
  ): Promise<Profile> {
    return await this.profileService.createProfile(user.id, createProfileDto);
  }
}
