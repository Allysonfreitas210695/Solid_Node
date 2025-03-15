import Fastify from 'fastify';
import { appRoutes } from './http/routes';
import { ZodError } from 'zod';
import { env } from './env';

export const app = Fastify({
  logger: true,
});

app.register(appRoutes);

app.setErrorHandler((error, _, replay) => {
  if (error instanceof ZodError) {
    return replay.status(404).send({
      message: 'Validation error.',
      issues: error.format(),
    });
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error);
  }

  return replay.status(500).send({ message: 'Internal server error.' });
});
