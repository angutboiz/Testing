/* eslint-disable prettier/prettier */
import { Prisma, User } from '@prisma/client';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) { }

    async findAllUsers() {
        return this.prisma.user.findMany();
    }

    async findOne(email: string) {
        return this.prisma.user.findUnique({ where: { email: email } });
    }

    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        const saltOrRounds = 10;
        const password = await bcrypt.hash(data.password, saltOrRounds);

        const newUser = {
            email: data.email,
            password,
        };

        return this.prisma.user.create({ data: newUser });
    }
}
