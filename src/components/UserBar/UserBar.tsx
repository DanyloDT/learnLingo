import clsx from 'clsx';
import { FiLogOut } from 'react-icons/fi';

import { Thema } from '@/utils/definitions';
import { FC } from 'react';

interface UserBarProps {
  handleClick: (path: string) => void;
  userName: string | null;
  status: Thema;
}

export const UserBar: FC<UserBarProps> = ({ userName, status, handleClick }) => {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center md:gap-x-4 gap-y-10">
      <button
        type="button"
        onClick={() => handleClick('logout')}
        className="flex gap-2 items-center text-[26px] font-extrabold md:font-bold md:text-base/5 hover:scale-110 transition-all duration-300"
      >
        <FiLogOut
          size={30}
          className={clsx('md:w-5 md:h-5', {
            'stroke-orange': status === 'themaA',
            'stroke-darkGreen': status === 'themaB',
            'stroke-darkBlue': status === 'themaC',
            'stroke-rose': status === 'themaD',
            'stroke-peach': status === 'themaF',
          })}
        />
        Log out
      </button>
      <p className="p-[12px] rounded-xl bg-dark text-white font-extrabold md:font-bold md:text-base/5">
        Hello, {userName}!
      </p>
    </div>
  );
};
