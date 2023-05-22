import 'server-only';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const jwtPayloadSchema = z.object({
  name: z.string(),
  avatarUrl: z.string(),
  sub: z.string(),
  iat: z.number().int(),
  exp: z.number().int(),
});

type GetSessionReturn =
  | { isUserAuthed: false; userInfo: null }
  | { isUserAuthed: true; userInfo: z.infer<typeof jwtPayloadSchema> };

export function getSession(): GetSessionReturn {
  const authToken = cookies().get('token');

  if (authToken) {
    let payload;
    try {
      payload = jwt.verify(authToken.value, process.env.JWT_SECRET as string);
    } catch (error) {}

    const payloadParseResult = jwtPayloadSchema.safeParse(payload);
    if (payloadParseResult.success)
      return { isUserAuthed: true, userInfo: payloadParseResult.data };
  }

  return { isUserAuthed: false, userInfo: null };
}
