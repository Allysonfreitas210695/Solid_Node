import { expect, describe, it, beforeEach } from 'vitest';

import { CreateGymUseCase } from './create-gym';

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });

  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'Javascript Gym',
      description: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
      phone: null,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
