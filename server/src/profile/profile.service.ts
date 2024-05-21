import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, Profile } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfileDto } from './dto/createProfile.dto';
import { UpdateProfileDto } from './dto/updateProfile.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Get current user's profile
   * @param userId
   * @returns
   */
  async getUserProfile(userId: number): Promise<Profile> {
    const profile = await this.prisma.profile.findUnique({
      where: { userId: userId },
    });
    if (!profile) throw new NotFoundException("Not found user's profile");
    return profile;
  }

  private async validatePhoneNumber(phoneNumber: string) {
    const phoneUsed = await this.prisma.profile.findUnique({
      where: { phoneNumber: phoneNumber },
    });
    if (phoneUsed) throw new ConflictException('Phone number already registed');
  }

  /**
   * Create user profile
   * If user onboarding -> 403 Forbidden
   * If phoneNumber is exists -> 400 Bad Request
   * @param userId
   * @param createProfileDto
   * @returns Profile
   */
  async createProfile(
    userId: number,
    createProfileDto: CreateProfileDto,
  ): Promise<Profile> {
    await this.validatePhoneNumber(createProfileDto.phoneNumber);

    const birthday = new Date(createProfileDto.birthday);
    const profile = await this.prisma.profile.create({
      data: { ...createProfileDto, userId: userId, birthday: birthday },
    });
    // update user's onboarding status
    await this.prisma.user.update({
      where: { id: userId },
      data: { onboarding: true },
    });
    return profile;
  }

  /**
   * Update user profile
   * If phoneNumber is exists -> 400 Bad Request
   * @param userId
   * @param updateProfileDto
   * @returns Profile
   */
  async updateProfile(
    userId: number,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    const data: Prisma.ProfileUpdateInput = updateProfileDto;

    // Validate user's profile and phone number
    await this.getUserProfile(userId);

    if (updateProfileDto.phoneNumber) {
      await this.validatePhoneNumber(updateProfileDto.phoneNumber);
    }
    if (updateProfileDto.birthday) {
      // Format birthday string -> ISO 8601 Datetime
      const birthday = new Date(updateProfileDto.birthday);
      data.birthday = birthday;
    }

    return await this.prisma.profile.update({
      where: { userId: userId },
      data: data,
    });
  }
}
