/* eslint-disable prettier/prettier */
import { Prisma, User } from '@prisma/client';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllUsers() {
    return this.prisma.user.findMany();
  }

  async findOne(email: string) {
    return this.prisma.user.findUnique({ where: { email: email } });
  }

  async findById(id: number) {
    return this.prisma.user.findUnique({ where: { id: id } });
  }

  async findUser(query: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique({ where: query });
  }

  async findFirst(query: Prisma.UserWhereUniqueInput) {
    const { username, email } = query;

    return this.prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const saltOrRounds = 10;
    const password = await bcrypt.hash(data.password, saltOrRounds);

    const newUser = {
      username: data.username,
      email: data.email,
      password,
    };

    return this.prisma.user.create({ data: newUser });
  }
}
