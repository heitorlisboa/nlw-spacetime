import { getSession } from '@/lib/auth';

import { SignIn } from '@/components/SignIn';
import { Hero } from '@/components/Hero';
import { Copyright } from '@/components/Copyright';
import { EmptyMemories } from '@/components/EmptyMemories';
import { Profile } from '@/components/Profile';

export default function Home() {
  const { isUserAuthed, userInfo } = getSession();

  return (
    <main className="grid min-h-screen grid-cols-2">
      {/* Left */}
      <div className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-[url(/bg-stars.svg)] bg-cover px-28 py-16">
        {/* Blur */}
        <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-[50%] bg-purple-700/50 blur-[194px]" />

        {/* Stripes */}
        <div className="absolute bottom-0 right-2 top-0 w-2 bg-stripes" />

        {isUserAuthed ? (
          <Profile name={userInfo.name} avatarUrl={userInfo.avatarUrl} />
        ) : (
          <SignIn />
        )}
        <Hero />
        <Copyright />
      </div>

      {/* Right */}
      <div className="flex flex-col bg-[url(/bg-stars.svg)] bg-cover p-16">
        <EmptyMemories />
      </div>
    </main>
  );
}
