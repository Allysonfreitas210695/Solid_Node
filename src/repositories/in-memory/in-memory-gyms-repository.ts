import { Gym, Prisma } from '@prisma/client';
import { randomUUID } from 'node:crypto';

import { FindManyNearbyParams, GymsRepository } from '../gyms-repository';

import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates';

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = [];

  async findById(gym_id: string): Promise<Gym | null> {
    const gym = this.items.find((item) => item.id === gym_id);

    if (!gym) return null;

    return gym;
  }

  async findManyNearby(params: FindManyNearbyParams) {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.latitude, longitude: params.longitude },
        {
          latitude: item.latitude.toNumber(),

          longitude: item.longitude.toNumber(),
        },
      );
      return distance < 10;
    });
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    return this.items
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * 20, page * 20);
  }

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: Prisma.Decimal(data.latitude.toString()),
      longitude: Prisma.Decimal(data.longitude.toString()),
      create_at: new Date(),
    };

    this.items.push(gym);

    return gym;
  }
}
