import { Prisma, User } from '@prisma/client';
import { PrismaService } from './../prisma/prisma.service';
import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersResponse } from './dto/users-reponse.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  /**
   * Find user by unique input
   * @param query
   * @returns User
   */
  async findUser(query: Prisma.UserWhereUniqueInput): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: query });
    return user;
  }

  /**
   * Find user by both email or username
   * @param query
   * @returns User
   */
  async findFirst(query: Prisma.UserWhereUniqueInput): Promise<User> {
    const { username, email } = query;

    return this.prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });
  }

  /**
   * Create user by create input
   * @param data
   * @returns User
   */
  async createUser(data: Prisma.UserCreateInput): Promise<UsersResponse> {
    // Format - lower and remove all spaces

    // Check if unique user
    const query = {
      username: data.username,
      email: data.email,
    };
    const user = await this.findFirst(query);
    if (user) throw new ConflictException('The user is already exists!');

    // Create new user
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltOrRounds);

    const payload = {
      username: data.username,
      email: data.email,
      password: hashedPassword,
    };

    const newUser = await this.prisma.user.create({
      data: payload,
    });
    const { password, ...body } = newUser;
    return body;
  }

  /**
   * Deactive user
   * @param id
   * @returns U
   */
  async deleteUser(id: number) {
    const user = await this.prisma.user.update({
      where: { id },
      data: { active: false },
    });
    if (user) return { msg: 'User has been deleted.' };
  }

  async getCurrentUser(
    user: User,
  ): Promise<{ success: boolean; data: UsersResponse }> {
    const { password, ...body } = user;
    return { success: true, data: body };
  }
}
