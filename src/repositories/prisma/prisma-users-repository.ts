import { prisma } from '@/lib/prisma';
import { Prisma, User } from '@prisma/client';

import { UsersRepository } from '@/repositories/users-repository';
export class PrismaUsersRepository implements UsersRepository {
  async findById(userId: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async create({ name, email, password_hash }: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password_hash,
      },
    });

    return user;
  }
}
