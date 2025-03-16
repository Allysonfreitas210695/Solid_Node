import { Gym } from '@prisma/client';
import { GymsRepository } from '../gyms-repository';

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = [];

  async findById(gym_id: string): Promise<Gym | null> {
    const gym = this.items.find((item) => item.id === gym_id);

    if (!gym) return null;

    return gym;
  }
}
