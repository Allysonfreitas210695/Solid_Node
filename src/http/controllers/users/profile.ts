import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use.case';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function profile(request: FastifyRequest, replay: FastifyReply) {
  const getUserProfile = makeGetUserProfileUseCase();
  const { user } = await getUserProfile.execute({ userId: request.user.sub });

  return replay.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  });
}
