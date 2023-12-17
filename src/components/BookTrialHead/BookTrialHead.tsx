import { FC } from 'react';
import Image from 'next/image';

import { TeacherAvatarProps } from '@/utils/definitions';

export const BookTrialHead: FC<TeacherAvatarProps> = ({ name, avatarUrl, surname }) => {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-[40px] leading-[48px] font-medium tracking-[-0.8px]">
        Book trial lesson
      </h2>
      <p className="">
        Our experienced tutor will assess your current language level, discuss your learning goals,
        and tailor the lesson to your specific needs.
      </p>
      <div className="flex gap-[14px]">
        <Image
          className="rounded-full"
          width={44}
          height={44}
          src={avatarUrl}
          alt={`${name} ${surname}`}
        />
        <div className="flex flex-col ">
          <p className="text-xs font-medium">Your teacher</p>
          <p className="font-medium">{`${name} ${surname}`}</p>
        </div>
      </div>
    </div>
  );
};
