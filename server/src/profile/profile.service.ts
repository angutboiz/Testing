import { Injectable } from '@nestjs/common';
import { Prisma, Profile } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfileDto } from './dto/createProfile.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserProfile(userId: number): Promise<Profile> {
    return await this.prisma.profile.findUnique({ where: { userId: userId } });
  }

  async createProfile(
    userId: number,
    createProfileDto: Prisma.ProfileUncheckedCreateInput,
  ): Promise<Profile> {
    return await this.prisma.profile.create({
      data: { ...createProfileDto, userId: userId },
    });
  }
}
