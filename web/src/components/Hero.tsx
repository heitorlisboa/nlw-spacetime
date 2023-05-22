import Image from 'next/image';

export const Hero = () => (
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
        Colecione momentos marcantes da sua jornada e compartilhe (se quiser)
        com o mundo!
      </p>
    </div>
    <button className="rounded-full bg-green-500 px-5 py-3 text-sm font-bold uppercase leading-none text-black transition-colors hocus:bg-green-600">
      Cadastrar lembrança
    </button>
  </div>
);
