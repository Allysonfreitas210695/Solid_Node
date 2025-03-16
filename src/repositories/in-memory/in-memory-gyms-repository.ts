import { Gym, Prisma } from '@prisma/client';
import { GymsRepository } from '../gyms-repository';
import { randomUUID } from 'node:crypto';

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = [];

  async findById(gym_id: string): Promise<Gym | null> {
    const gym = this.items.find((item) => item.id === gym_id);

    if (!gym) return null;

    return gym;
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
