import { PrismaClient } from '@prisma/client';
import Fastify from 'fastify';

export const fastify = Fastify({
  logger: true,
});

const prisma = new PrismaClient();

prisma.user.create({
  data: {
    name: 'Diego Fernandes',
    email: 'diego@rocketsaeet.com.br',
  },
});
