import { type FastifyInstance } from 'fastify';
import { z } from 'zod';

import { prisma } from '@/lib/prisma';

export async function memoriesRoutes(app: FastifyInstance) {
  app.get('/memories', async () => {
    const memories = await prisma.memory.findMany({
      orderBy: { createdAt: 'asc' },
    });

    const memoriesWithExcerpt = memories.map((memory) => ({
      id: memory.id,
      coverUrl: memory.coverUrl,
      excerpt: memory.content.slice(0, 115).concat('...'),
    }));
    return memoriesWithExcerpt;
  });

  app.get('/memories/:id', async (req) => {
    const paramsSchema = z.object({ id: z.string().uuid() });

    const { id } = paramsSchema.parse(req.params);

    const memory = await prisma.memory.findUnique({ where: { id } });
    return memory;
  });

  app.post('/memories', async (req) => {
    const bodySchema = z.object({
      coverUrl: z.string().url(),
      content: z.string(),
      isPublic: z.coerce.boolean().optional(),
    });

    const userId = 'aee69295-62e9-4e2a-ac2d-d02236325503';
    const { content, coverUrl, isPublic } = bodySchema.parse(req.body);

    const createdMemory = await prisma.memory.create({
      data: { userId, content, coverUrl, isPublic },
    });
    return createdMemory;
  });

  app.put('/memories/:id', async (req) => {
    const paramsSchema = z.object({ id: z.string().uuid() });

    const { id } = paramsSchema.parse(req.params);

    const bodySchema = z.object({
      coverUrl: z.string().url().optional(),
      content: z.string().optional(),
      isPublic: z.coerce.boolean().optional(),
    });

    const { content, coverUrl, isPublic } = bodySchema.parse(req.body);

    const updatedMemory = await prisma.memory.update({
      where: { id },
      data: { content, coverUrl, isPublic },
    });
    return updatedMemory;
  });

  app.delete('/memories/:id', async (req) => {
    const paramsSchema = z.object({ id: z.string().uuid() });

    const { id } = paramsSchema.parse(req.params);

    await prisma.memory.delete({ where: { id } });
  });
}
