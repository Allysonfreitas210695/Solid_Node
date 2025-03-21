import { expect, describe, it, beforeEach } from 'vitest';
import { compare } from 'bcryptjs';

import { RegisterUseCase } from './register';

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';

import { UserAlreadyExistsError } from './errors/user-already-exists-error';

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      email: 'alisonfr832@gmail.com',
      name: 'Allyson Bruno de freitas',
      password: '1234567',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      email: 'alisonfr832@gmail.com',
      name: 'Allyson Bruno de freitas',
      password: '1234567',
    });

    const isPasswordCorrectlyHashed = await compare(
      '1234567',
      user.password_hash,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it('should not be able to register with same email twice', async () => {
    const email = 'alisonfr832@gmail.com';

    await sut.execute({
      email,
      name: 'Allyson Bruno de freitas',
      password: '1234567',
    });

    await expect(() =>
      sut.execute({
        email,
        name: 'Allyson Bruno de freitas',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
