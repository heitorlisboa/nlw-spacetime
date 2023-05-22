import { NextResponse, type NextRequest } from 'next/server';

import { api } from '@/lib/api';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const code = searchParams.get('code');

  if (!code)
    return NextResponse.json(
      { error: '`code` query param is missing' },
      { status: 400 }
    );

  const registerResponse = await api.post<{ token: string }>('/register', {
    code,
  });

  const { token } = registerResponse.data;
  const redirectUrl = new URL('/', request.url);
  const cookieMaxAgeInSeconds = 60 * 60 * 24 * 30; // 30 days

  return NextResponse.redirect(redirectUrl, {
    headers: {
      'Set-Cookie': `token=${token}; Path=/; Max-Age=${cookieMaxAgeInSeconds};`,
    },
  });
}
