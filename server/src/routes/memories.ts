import { type FastifyInstance } from 'fastify';
import { z } from 'zod';

import { prisma } from '@/lib/prisma';

export async function memoriesRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (req) => {
    await req.jwtVerify();
  });

  app.get('/memories', async (req) => {
    const memories = await prisma.memory.findMany({
      where: { userId: req.user.sub },
      orderBy: { createdAt: 'asc' },
    });

    const memoriesWithExcerpt = memories.map((memory) => ({
      id: memory.id,
      coverUrl: memory.coverUrl,
      excerpt: memory.content.slice(0, 115).concat('...'),
    }));
    return memoriesWithExcerpt;
  });

  app.get('/memories/:id', async (req, reply) => {
    const paramsSchema = z.object({ id: z.string().uuid() });

    const { id } = paramsSchema.parse(req.params);

    const memory = await prisma.memory.findUnique({ where: { id } });

    if (!memory || (!memory.isPublic && memory.userId !== req.user.sub))
      return reply.status(404).send();

    return memory;
  });

  app.post('/memories', async (req) => {
    const bodySchema = z.object({
      coverUrl: z.string().url(),
      content: z.string(),
      isPublic: z.coerce.boolean().optional(),
    });

    const { content, coverUrl, isPublic } = bodySchema.parse(req.body);

    const createdMemory = await prisma.memory.create({
      data: { userId: req.user.sub, content, coverUrl, isPublic },
    });
    return createdMemory;
  });

  app.put('/memories/:id', async (req, reply) => {
    const paramsSchema = z.object({ id: z.string().uuid() });

    const { id } = paramsSchema.parse(req.params);

    const bodySchema = z.object({
      coverUrl: z.string().url().optional(),
      content: z.string().optional(),
      isPublic: z.coerce.boolean().optional(),
    });

    const { content, coverUrl, isPublic } = bodySchema.parse(req.body);

    let memory = await prisma.memory.findUnique({ where: { id } });

    if (!memory || memory.userId !== req.user.sub)
      return reply.status(404).send();

    memory = await prisma.memory.update({
      where: { id },
      data: { content, coverUrl, isPublic },
    });
    return memory;
  });

  app.delete('/memories/:id', async (req, reply) => {
    const paramsSchema = z.object({ id: z.string().uuid() });

    const { id } = paramsSchema.parse(req.params);

    const memory = await prisma.memory.findUnique({ where: { id } });

    if (!memory || memory.userId !== req.user.sub)
      return reply.status(404).send();

    await prisma.memory.delete({ where: { id } });
  });
}
