import { Roboto_Flex, Bai_Jamjuree } from 'next/font/google';

import './globals.css';

import { getSession } from '@/lib/auth';

import { Profile } from '@/components/Profile';
import { SignIn } from '@/components/SignIn';
import { Hero } from '@/components/Hero';
import { Copyright } from '@/components/Copyright';

const robotoFlex = Roboto_Flex({
  subsets: ['latin'],
  variable: '--font-roboto-flex',
});
const baiJamjuree = Bai_Jamjuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-bai-jamjuree',
});

export const metadata = {
  title: 'NLW Spacetime',
  description:
    'Uma cápsula do tempo feita com React, Next.js, Tailwind CSS e TypeScript.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isUserAuthed, userInfo } = getSession();

  return (
    <html lang="en">
      <body
        className={`${robotoFlex.variable} ${baiJamjuree.variable} bg-gray-900 font-sans text-gray-100 antialiased`}
      >
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
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
