import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Profile, User } from '@prisma/client';
import { CurrentUser } from '../users/user.decorator';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards';
import { Onboarding } from './guards/onboarding.guard';
import { CreateProfileDto } from './dto/createProfile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './multerOptions';
import { UpdateProfileDto } from './dto/updateProfile.dto';
import { UserActive } from '../users/guards/user-active.guard';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  @UseGuards(JwtAuthGuard, UserActive)
  @Get()
  async getUserProfile(@CurrentUser() user: User): Promise<Profile> {
    return await this.profileService.getUserProfile(user.id);
  }

  @UseGuards(JwtAuthGuard, UserActive, Onboarding)
  @Post()
  @UseInterceptors(FileInterceptor('avatar', multerOptions))
  async createUserProfile(
    @Body() createProfileDto: CreateProfileDto,
    @CurrentUser() user: User,
    @UploadedFile()
    avatar: Express.Multer.File,
  ): Promise<Profile> {
    if (avatar) {
      createProfileDto = {
        ...createProfileDto,
        avatar: avatar.path,
      };
    }
    return await this.profileService.createProfile(user.id, createProfileDto);
  }

  @UseGuards(JwtAuthGuard, UserActive)
  @Patch()
  @UseInterceptors(FileInterceptor('avatar', multerOptions))
  async updateUserProfile(
    @Body() updateProfileDto: UpdateProfileDto,
    @CurrentUser() user: User,
    @UploadedFile()
    avatar: Express.Multer.File,
  ): Promise<Profile> {
    if (avatar) {
      updateProfileDto = {
        ...updateProfileDto,
        avatar: avatar.path,
      };
    }
    return await this.profileService.updateProfile(user.id, updateProfileDto);
  }
}
