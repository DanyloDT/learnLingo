import { FC } from 'react';
import clsx from 'clsx';
import Image from 'next/image';

import { TeacherAvatarProps } from '@/utils/definitions';

export const TeacherAvatar: FC<TeacherAvatarProps> = ({ name, avatarUrl, surname, status }) => {
  return (
    <div
      className={clsx('relative flex-shrink-0 mx-auto md:mx-0 p-3 mb-4 rounded-full border-[3px]', {
        'border-orange': status === 'themaA',
        'border-darkGreen': status === 'themaB',
        'border-darkBlue': status === 'themaC',
        'border-rose': status === 'themaD',
        'border-peach': status === 'themaF',
      })}
    >
      <Image
        src={avatarUrl}
        width={96}
        height={96}
        alt={`${name} ${surname}`}
        className="rounded-full"
      />
      <span className="block absolute top-4 right-6 w-3 h-3 rounded-full bg-green border-[3px] border-white"></span>
    </div>
  );
};
