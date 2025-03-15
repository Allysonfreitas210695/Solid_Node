import { fastify } from './app';
import { env } from './env';

fastify.listen(
  {
    host: '0.0.0.0',
    port: env.PORT,
  },
  () => {
    console.log('listening on port ');
  },
);
