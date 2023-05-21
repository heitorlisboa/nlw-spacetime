import Image from 'next/image';
import { User } from 'lucide-react';

export default function Home() {
  return (
    <main className="grid min-h-screen grid-cols-2">
      {/* Left */}
      <div className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-[url(/bg-stars.svg)] bg-cover px-28 py-16">
        {/* Blur */}
        <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-[50%] bg-purple-700/50 blur-[194px]" />

        {/* Stripes */}
        <div className="absolute bottom-0 right-2 top-0 w-2 bg-stripes" />

        {/* Sign in */}
        <a href="#" className="flex gap-3 transition-colors hocus:text-gray-50">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
            <User className="text-gray-500" />
          </div>

          <p className="max-w-[8.75rem] text-sm leading-snug">
            <span className="underline">Crie sua conta</span> e salve suas
            memórias!
          </p>
        </a>

        {/* Hero */}
        <div className="flex max-w-md flex-col items-start gap-5">
          <Image
            src="/nlw-spacetime-logo.svg"
            alt="NLW Spacetime"
            width={160}
            height={48}
          />
          <div>
            <h1 className="text-[2.5rem] font-bold leading-tight text-gray-50">
              Sua cápsula do tempo
            </h1>
            <p className="text-lg leading-relaxed">
              Colecione momentos marcantes da sua jornada e compartilhe (se
              quiser) com o mundo!
            </p>
          </div>
          <button className="rounded-full bg-green-500 px-5 py-3 text-sm font-bold uppercase leading-none text-black transition-colors hocus:bg-green-600">
            Cadastrar lembrança
          </button>
        </div>

        <footer className="text-sm leading-relaxed text-gray-200">
          Feito com 💜 no NLW da{' '}
          <a
            className="underline transition-colors hocus:text-gray-50"
            href="https://rocketseat.com.br"
          >
            Rocketseat
          </a>
        </footer>
      </div>

      {/* Right */}
      <div className="flex flex-col bg-[url(/bg-stars.svg)] bg-cover p-16">
        <div className="flex flex-1 items-center justify-center">
          <p className="w-[22.5rem] text-center">
            Você ainda não registrou nenhuma lembrança, comece a{' '}
            <a
              className="underline transition-colors hocus:text-gray-50"
              href="#"
            >
              criar agora
            </a>
            !
          </p>
        </div>
      </div>
    </main>
  );
}
