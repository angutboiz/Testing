import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma, Profile } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfileDto } from './dto/createProfile.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserProfile(userId: number): Promise<Profile> {
    return await this.prisma.profile.findUnique({ where: { userId: userId } });
  }

  private async userHasProfile(userId: number) {
    const isUserHasProfile = await this.getUserProfile(userId);
    if (isUserHasProfile)
      throw new ConflictException('User already has a profile');
  }

  private async validatePhoneNumber(phoneNumber: string) {
    const phoneUsed = await this.prisma.profile.findUnique({
      where: { phoneNumber: phoneNumber },
    });
    if (phoneUsed) throw new ConflictException('Phone number already registed');
  }

  async createProfile(
    userId: number,
    createProfileDto: Prisma.ProfileUncheckedCreateInput,
  ): Promise<Profile> {
    await this.userHasProfile(userId);
    await this.validatePhoneNumber(createProfileDto.phoneNumber);

    const birthday = new Date(createProfileDto.birthday);
    return await this.prisma.profile.create({
      data: { ...createProfileDto, userId: userId, birthday: birthday },
    });
  }
}
