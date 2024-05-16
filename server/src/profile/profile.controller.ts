import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Profile, User } from '@prisma/client';
import { CurrentUser } from 'src/users/user.decorator';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { Onboarding } from './guards/onboarding.guard';
import { CreateProfileDto } from './dto/createProfile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './multerOptions';

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
  @UseInterceptors(FileInterceptor('avatar', multerOptions))
  async createUserProfile(
    @Body() createProfileDto: CreateProfileDto,
    @CurrentUser() user: User,
    @UploadedFile()
    avatar: Express.Multer.File,
  ): Promise<Profile> {
    const formattedData = {
      ...createProfileDto,
      avatar: avatar.path,
    };
    return await this.profileService.createProfile(user.id, formattedData);
  }
}
