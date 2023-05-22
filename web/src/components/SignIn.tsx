import { User } from 'lucide-react';

export const SignIn = () => (
  <a
    href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`}
    className="flex gap-3 transition-colors hocus:text-gray-50"
  >
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
      <User className="text-gray-500" />
    </div>

    <p className="max-w-[8.75rem] text-sm leading-snug">
      <span className="underline">Crie sua conta</span> e salve suas memórias!
    </p>
  </a>
);
