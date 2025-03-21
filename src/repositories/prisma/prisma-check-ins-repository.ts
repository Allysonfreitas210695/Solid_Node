import { CheckIn, Prisma } from '@prisma/client';
import dayjs from 'dayjs';

import { CheckInsRepository } from '../check-ins-repository';

import { prisma } from '@/lib/prisma';

export class PrismaCheckInsRepository implements CheckInsRepository {
  async findById(id: string): Promise<CheckIn | null> {
    return await prisma.checkIn.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = await prisma.checkIn.create({
      data,
    });

    return checkIn;
  }

  async countByUserId(id: string): Promise<number> {
    const count = await prisma.checkIn.count({
      where: {
        id,
      },
    });

    return count;
  }

  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return checkIns;
  }

  async findByUserIdOnDate(
    userId: string,
    date: Date,
  ): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf('date');
    const endOfTheDay = dayjs(date).endOf('date');

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    });

    return checkIn;
  }

  async save(data: CheckIn): Promise<CheckIn> {
    const checkIn = await prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data,
    });

    return checkIn;
  }
}
