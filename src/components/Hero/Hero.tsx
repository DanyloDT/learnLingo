import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import { FC } from 'react';

import { AppleIcon } from '../AppleIcon/AppleIcon';
import HeroImg from '../../../public/images/hero/hero.png';
import { Thema } from '@/utils/definitions';

interface HeroProps {
  status: Thema;
}

export const Hero: FC<HeroProps> = ({ status }) => {
  return (
    <section className="flex justify-center items-stretch flex-col gap-4 w-full sm:flex-row lg:gap-6">
      <div className="flex flex-col justify-center bg-heroBg rounded-[15px] p-4 md:py-7 lg:pl-10 xl:py-24 w-full xl:w-[720px] xl:pl-16">
        <h1 className="text-2xl font-medium leading-tight tracking-tight sm:text-3xl lg:text-4xl xl:text-5xl xl:leading-[56px] xl:tracking-[-0.96px]">
          Unlock your potential with <br className="hidden xl:inline" /> the best{' '}
          <span
            className={clsx('italic font-normal rounded-lg', {
              'bg-banana': status === 'themaA',
              'bg-lightGreen': status === 'themaB',
              'bg-lightBlue': status === 'themaC',
              'bg-pink': status === 'themaD',
              'bg-powder': status === 'themaF',
            })}
          >
            language
          </span>{' '}
          tutors
        </h1>
        <p className="mt-4 mb-8 text-sm leading-normal tracking-tight sm:mt-8 sm:mb-16 sm:text-base md:leading-[22px] md:tracking-[-0.32px]">
          Embark on an Exciting Language Journey with Expert Language
          <br className="hidden lg:inline" /> Tutors: Elevate your language proficiency to new
          heights by
          <br className="hidden lg:inline" /> connecting with highly qualified and experienced
          tutors.
        </p>
        <Link
          href="/teachers"
          className={clsx(
            'animate-pulse hover:animate-none perspective[800px] transition-transform duration-300 hover:rotate-6 flex justify-center items-center w-full px-3 py-2 rounded-xl text-base font-bold  sm:w-auto sm:px-4 sm:py-3 md:w-[267px] md:text-lg',
            {
              'bg-orange': status === 'themaA',
              'bg-darkGreen': status === 'themaB',
              'bg-darkBlue': status === 'themaC',
              'bg-rose': status === 'themaD',
              'bg-peach': status === 'themaF',
            }
          )}
        >
          Get started
        </Link>
      </div>
      <div
        className={clsx(
          'flex flex-col justify-end items-center w-full px-4 pt-10 rounded-[15px] sm:w-1/2 lg:w-[468px] xl:w-[568px]',
          {
            'bg-banana': status === 'themaA',
            'bg-lightGreen': status === 'themaB',
            'bg-lightBlue': status === 'themaC',
            'bg-pink': status === 'themaD',
            'bg-powder': status === 'themaF',
          }
        )}
      >
        <Image
          src={HeroImg}
          width={300}
          height={300}
          alt="curly person"
          loading="lazy"
          className="w-52 xl:w-[300px] h-auto"
        />
        <div
          className={clsx(
            'flex justify-center items-center w-64 h-24 rounded-t-lg md:w-[308px] sm:h-24 md:h-28 lg:w-[370px] lg:h-44',
            {
              'bg-tumbaThemaA': status === 'themaA',
              'bg-tumbaThemaB': status === 'themaB',
              'bg-tumbaThemaC': status === 'themaC',
              'bg-tumbaThemaD': status === 'themaD',
              'bg-tumbaThemaF': status === 'themaF',
            }
          )}
        >
          <AppleIcon status={status} />
        </div>
      </div>
    </section>
  );
};
