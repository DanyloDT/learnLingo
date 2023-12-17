'use client';

import clsx from 'clsx';
import { FC } from 'react';
import { FiLogIn } from 'react-icons/fi';

import { Thema } from '@/utils/definitions';

interface AuthProps {
  handleClick: (path: string) => void;
  status?: Thema;
}

export const Auth: FC<AuthProps> = ({ status, handleClick }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-10 md:flex-row md:gap-4 ">
      <button
        onClick={() => handleClick('login')}
        className="flex gap-2 items-center text-[26px] font-extrabold md:font-bold md:text-base/5 hover:scale-110 transition-transform duration-300"
      >
        <FiLogIn
          size={30}
          className={clsx('md:w-5 md:h-5', {
            'stroke-orange': status === 'themaA',
            'stroke-darkGreen': status === 'themaB',
            'stroke-darkBlue': status === 'themaC',
            'stroke-rose': status === 'themaD',
            'stroke-peach': status === 'themaF',
          })}
        />
        Log in
      </button>
      <button
        onClick={() => handleClick('registration')}
        className={clsx(
          'w-48 h-14 md:w-40 md:h-10 rounded-xl bg-dark text-white text-2xl font-extrabold md:font-bold md:text-base/5 hover:scale-105 hover:text-dark transition-all duration-300',
          {
            'hover:bg-orange': status === 'themaA',
            'hover:bg-darkGreen': status === 'themaB',
            'hover:bg-darkBlue': status === 'themaC',
            'hover:bg-rose': status === 'themaD',
            'hover:bg-peach': status === 'themaF',
          }
        )}
      >
        Registration
      </button>
    </div>
  );
};
