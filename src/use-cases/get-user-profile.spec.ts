import { expect, describe, it, beforeEach } from 'vitest';
import { hash } from 'bcryptjs';

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';

import { GetUserProfileUseCase } from './get-user-profile';

import { ResourceNotFoundError } from './errors/resource-not-found-error';

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });

  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      email: 'alisonfr832@gmail.com',
      name: 'Allyson Teste',
      password_hash: await hash('1234567', 6),
    });

    const { user } = await sut.execute({ userId: createdUser.id });

    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toEqual('Allyson Teste');
  });

  it('should not be able to get user profile', async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
