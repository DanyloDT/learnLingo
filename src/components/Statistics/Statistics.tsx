import { FC } from 'react';
import clsx from 'clsx';

import { Thema } from '@/utils/definitions';

interface StatusProps {
  status: Thema;
}

export const Statistics: FC<StatusProps> = ({ status }) => {
  return (
    <div
      className={clsx(
        'flex flex-col justify-center items-center w-full gap-10 py-10 mt-6 md:flex-wrap md:flex-row xl:gap-[100px] border-[2px] border-dashed rounded-[15px]',
        {
          'border-orange': status === 'themaA',
          'border-darkGreen': status === 'themaB',
          'border-darkBlue': status === 'themaC',
          'border-rose': status === 'themaD',
          'border-peach': status === 'themaF',
        }
      )}
    >
      <div className="flex md:w-1/3 lg:w-auto  gap-x-4  justify-center items-center ">
        <p className="text-[28px] leading-8 tracking-[-0.56px] font-medium ">32,000 +</p>
        <p className=" leading-[18px] tracking-[-0.28px] w-[90px] text-ligthDark">
          Experienced tutors
        </p>
      </div>
      <div className="flex md:w-1/3 lg:w-auto gap-x-4 justify-center items-center">
        <p className="text-[28px] leading-8 tracking-[-0.56px] font-medium ">300,000 +</p>
        <p className="leading-[18px] tracking-[-0.28px] w-[90px] text-ligthDark">
          5-star tutor reviews
        </p>
      </div>
      <div className="flex md:w-1/3 lg:w-auto gap-x-4  justify-center items-center">
        <p className="text-[28px] leading-8 tracking-[-0.56px] font-medium ">120 +</p>
        <p className="leading-[18px] tracking-[-0.28px] w-[90px] text-ligthDark">Subjects taught</p>
      </div>
      <div className="flex md:w-1/3 lg:w-auto gap-x-4  justify-center items-center">
        <p className="text-[28px] leading-8 tracking-[-0.56px] font-medium ">200 +</p>
        <p className="leading-[18px] tracking-[-0.28px] w-[90px] text-ligthDark">
          Tutor nationalities
        </p>
      </div>
    </div>
  );
};
