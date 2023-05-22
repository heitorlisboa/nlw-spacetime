import Image from 'next/image';

type ProfileProps = {
  name: string;
  avatarUrl: string;
};

export const Profile = ({ name, avatarUrl }: ProfileProps) => (
  <div className="flex items-center gap-3">
    <Image
      className="h-10 w-10 rounded-full"
      src={avatarUrl}
      alt=""
      width={40}
      height={40}
      quality={100}
    />

    <p className="max-w-[8.75rem] text-sm leading-snug">
      {name}
      <a
        className="block text-red-400 transition-colors hocus:text-red-300"
        href="#"
      >
        Quero sair
      </a>
    </p>
  </div>
);
