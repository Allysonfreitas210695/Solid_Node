import { Gym } from '@prisma/client';

export interface GymsRepository {
  findById(gym_id: string): Promise<Gym | null>;
}
