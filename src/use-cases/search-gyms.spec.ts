import { expect, describe, it, beforeEach } from 'vitest';
import { CreateGymUseCase } from './create-gym';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { SearchGymsUseCase } from './search-gyms';

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymsRepository);
  });

  it('should be able to fetch gyms search', async () => {
    await gymsRepository.create({
      title: 'Javascript Gym',
      description: '',
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    });

    await gymsRepository.create({
      title: 'Typescript Gym',
      description: '',
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    });

    const { gyms } = await sut.execute({
      query: 'Javascript',
      page: 1,
    });

    expect(gyms).toHaveLength(1);

    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Javascript Gym' }),
    ]);
  });

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Typescript Gym ${i}`,
        description: '',
        phone: null,
        latitude: -27.2092052,
        longitude: -49.6401091,
      });
    }

    const { gyms } = await sut.execute({
      query: 'Typescript',
      page: 2,
    });

    expect(gyms).toHaveLength(2);

    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Typescript Gym 21' }),
      expect.objectContaining({ title: 'Typescript Gym 22' }),
    ]);
  });
});
