import { type FastifyInstance } from 'fastify';
import axios from 'axios';
import { z } from 'zod';

import type { User } from '@/types/github';
import { prisma } from '@/lib/prisma';

export async function authRoutes(app: FastifyInstance) {
  app.post('/register', async (req) => {
    const bodySchema = z.object({
      code: z.string(),
    });

    const { code } = bodySchema.parse(req.body);

    const accessTokenResponse = await axios.post<{ access_token: string }>(
      'https://github.com/login/oauth/access_token',
      null,
      {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        headers: { Accept: 'application/json' },
      }
    );

    const { access_token: accessToken } = accessTokenResponse.data;

    const userResponse = await axios.get<User>('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userInfo = userResponse.data;

    let user = await prisma.user.findUnique({
      where: { githubId: userInfo.id },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          githubId: userInfo.id,
          name: userInfo.name ?? userInfo.login,
          login: userInfo.login,
          avatarUrl: userInfo.avatar_url,
        },
      });
    }

    const token = app.jwt.sign(
      { name: user.name, avatarUrl: user.avatarUrl },
      { sub: user.id, expiresIn: '1d' }
    );

    return { token };
  });
}
