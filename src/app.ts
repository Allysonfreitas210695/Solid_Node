import Fastify from 'fastify';
import { appRoutes } from './http/routes';

export const app = Fastify({
  logger: true,
});

appRoutes(app);
